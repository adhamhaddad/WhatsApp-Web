import { PoolClient } from 'pg';
import { pgClient } from '../database';
import Conversation, { ConversationType } from './conversation';
import { GroupMemberType } from './groupMember';

type GroupType = {
  id: number;
  name: string;
  icon_url: string;
  conversation_participants_id: number;
  members: [{ group_id: number; user_id: number }];
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
};

class Group {
  async withConnection<T>(
    callback: (connection: PoolClient) => Promise<T>
  ): Promise<T> {
    const connection = await pgClient.connect();
    try {
      return await callback(connection);
    } catch (error) {
      throw new Error((error as Error).message);
    } finally {
      connection.release();
    }
  }
  async withTransaction<T>(
    connection: PoolClient,
    callback: () => Promise<T>
  ): Promise<T> {
    try {
      await connection.query('BEGIN');
      const result = await callback();
      await connection.query('COMMIT');
      return result;
    } catch (error) {
      await connection.query('ROLLBACK');
      throw error;
    }
  }
  // async createGroup(
  //   g: GroupType & ConversationType & GroupMemberType
  // ): Promise<GroupType> {
  //   return this.withConnection(async (connection: PoolClient) => {
  //     return this.withTransaction(connection, async () => {
  //       // INSERT CONVERSATION
  //       const conversation = new Conversation();
  //       const { id: conversation_id } = await conversation.createConversation(
  //         connection,
  //         g
  //       );

  //       // INSERT CONVERSATION PARTICIPANTS

  //       // INSERT GROUP
  //       const query = {
  //         text: 'INSERT INTO groups (name, icon_url, conversation_id) VALUES ($1, $2, $3) RETURNING *',
  //         values: [g.name, g.icon_url, conversation_id]
  //       };
  //       const result = await connection.query(query);
  //       const { id: group_id } = result.rows[0];

  //       // INSERT MEMBERS
  //       const memberValues = g.members.map((member) => ({
  //         group_id,
  //         user_id: member
  //       }));
  //       const memberQuery = {
  //         text: 'INSERT INTO group_members (group_id, user_id) VALUES ($1, unnest($2::int[]))',
  //         values: [group_id, memberValues.map((member) => member.user_id)]
  //       };
  //       await connection.query(memberQuery);

  //       return result.rows[0];
  //     });
  //   });
  // }
  async getGroup(id: string): Promise<GroupType> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: 'SELECT * FROM groups WHERE id=$1',
        values: [id]
      };
      const result = await connection.query(query);
      return result.rows[0];
    });
  }
  async getGroups(user_chat_id: string): Promise<GroupType[]> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: `
            SELECT g.*
            FROM groups g
            INNER JOIN group_bridge gb ON g.id = gb.group_id
            WHERE gb.user_chat_id = $1
        `,
        values: [user_chat_id]
      };
      const result = await connection.query(query);
      return result.rows;
    });
  }
  async updateGroup(id: string, g: GroupType): Promise<GroupType> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: 'UPDATE groups SET name=$2, icon_url=$3 WHERE id=$1',
        values: [id, g.name, g.icon_url]
      };
      const result = await connection.query(query);
      return result.rows[0];
    });
  }
  async deleteGroup(id: string): Promise<GroupType> {
    return this.withConnection(async (connection: PoolClient) => {
      const query = {
        text: 'UPDATE groups SET deleted_at=CURRENT_TIMESTAMP WHERE id=$1 RETURNING id',
        values: [id]
      };
      const result = await connection.query(query);
      return result.rows[0];
    });
  }
}
export default Group;
