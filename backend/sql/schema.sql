-- SET client_min_messages = warning;
-- -------------------------
-- Database whats_app
-- -------------------------
DROP DATABASE IF EXISTS whats_app;
--
--
CREATE DATABASE whats_app;
-- -------------------------
-- Database whats_app_test
-- -------------------------
DROP DATABASE IF EXISTS whats_app_test;
--
--
CREATE DATABASE whats_app_test;
-- -------------------------
-- Role admin
-- -------------------------
-- DROP ROLE IF EXISTS admin;
--
--
-- CREATE ROLE admin WITH PASSWORD 'admin';
-- -------------------------
-- Alter Role admin
-- -------------------------
-- ALTER ROLE admin WITH SUPERUSER CREATEROLE CREATEDB LOGIN;
-- -------------------------
-- Database GRANT PRIVILEGES
-- -------------------------
GRANT ALL PRIVILEGES ON DATABASE whats_app TO admin;
GRANT ALL PRIVILEGES ON DATABASE whats_app_test TO admin;
-- -------------------------
-- Connect to whats_app database
-- -------------------------
\c whats_app;
-- -------------------------
-- Table users
-- -------------------------
DROP TABLE IF EXISTS users;
--
--
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone_number VARCHAR(255) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    deleted_at TIMESTAMP
);
-- -------------------------
-- Table abouts
-- -------------------------
DROP TABLE IF EXISTS abouts;
--
--
CREATE TABLE IF NOT EXISTS abouts (
    id SERIAL PRIMARY KEY,
    about VARCHAR(300) NOT NULL DEFAULT 'Hey there! I am using WhatsApp.',
    user_id INT NOT NULL REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- -------------------------
-- Table profile_pictures
-- -------------------------
DROP TABLE IF EXISTS profile_pictures;
--
--
CREATE TABLE IF NOT EXISTS profile_pictures (
    id SERIAL PRIMARY KEY,
    image_url VARCHAR(200) NOT NULL,
    user_id INT NOT NULL REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- -------------------------
-- Table contacts
-- -------------------------
DROP TABLE IF EXISTS contacts;
--
--
CREATE TABLE IF NOT EXISTS contacts (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100),
    phone_number VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
);
-- -------------------------
-- Table blocked_contacts
-- -------------------------
DROP TABLE IF EXISTS blocked_contacts;
--
--
CREATE TABLE IF NOT EXISTS blocked_contacts (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
    contact_id  INT NOT NULL REFERENCES contacts(id) ON UPDATE CASCADE ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- -------------------------
-- Table conversations
-- -------------------------
DROP TABLE IF EXISTS conversations;
--
--
CREATE TABLE IF NOT EXISTS conversations (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP
);
-- -------------------------
-- Table deleted_conversations
-- -------------------------
DROP TABLE IF EXISTS deleted_conversations;
--
--
CREATE TABLE IF NOT EXISTS deleted_conversations (
    id SERIAL PRIMARY KEY,
    conversation_id INT NOT NULL REFERENCES conversations(id) ON UPDATE CASCADE ON DELETE CASCADE,
    user_id INT NOT NULL REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- -------------------------
-- Table conversation_participants
-- -------------------------
DROP TABLE IF EXISTS conversation_participants;
--
--
CREATE TABLE IF NOT EXISTS conversation_participants (
    id SERIAL PRIMARY KEY,
    conversation_id INT NOT NULL REFERENCES conversations(id) ON UPDATE CASCADE ON DELETE CASCADE,
    participant_id INT NOT NULL REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- -------------------------
-- Table messages
-- -------------------------
DROP TABLE IF EXISTS messages;
--
--
CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    conversation_id INT NOT NULL REFERENCES conversations(id) ON UPDATE CASCADE ON DELETE CASCADE,
    user_id INT NOT NULL REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
    message TEXT,
    is_seen BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    deleted_at TIMESTAMP
);
-- -------------------------
-- Table message_encryptions
-- -------------------------
DROP TABLE IF EXISTS message_encryptions;
--
--
CREATE TABLE IF NOT EXISTS message_encryptions (
    id SERIAL PRIMARY KEY,
    message_id INT NOT NULL REFERENCES messages(id) ON UPDATE CASCADE ON DELETE CASCADE,
    encryption_key TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- -------------------------
-- Table attachments
-- -------------------------
DROP TABLE IF EXISTS attachments;
--
--
CREATE TABLE IF NOT EXISTS attachments (
    id SERIAL PRIMARY KEY,
    message_id INT NOT NULL REFERENCES messages(id) ON UPDATE CASCADE ON DELETE CASCADE,
    file_url TEXT,
    image_url TEXT
);
-- -------------------------
-- Table message_reactions
-- -------------------------
DROP TABLE IF EXISTS message_reactions;
--
--
CREATE TABLE IF NOT EXISTS message_reactions (
    id SERIAL PRIMARY KEY,
    message_id INT NOT NULL REFERENCES messages(id) ON UPDATE CASCADE ON DELETE CASCADE,
    user_id INT NOT NULL REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
    reaction_type TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- -------------------------
-- Table deleted_messages
-- -------------------------
DROP TABLE IF EXISTS deleted_messages;
--
--
CREATE TABLE IF NOT EXISTS deleted_messages (
    id SERIAL PRIMARY KEY,
    message_id INT NOT NULL,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- -------------------------
-- Table chats
-- -------------------------
DROP TABLE IF EXISTS chats;
--
--
CREATE TABLE IF NOT EXISTS chats (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
    conversation_participants_id INT NOT NULL REFERENCES conversation_participants(id) ON UPDATE CASCADE ON DELETE CASCADE,
    last_message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    deleted_at TIMESTAMP
);
-- -------------------------
-- Table archived_chats
-- -------------------------
DROP TABLE IF EXISTS archived_chats;
--
--
CREATE TABLE IF NOT EXISTS archived_chats (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
    chat_id INT NOT NULL REFERENCES chats(id) ON UPDATE CASCADE ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- -------------------------
-- Table groups
-- -------------------------
DROP TABLE IF EXISTS groups;
--
--
CREATE TABLE IF NOT EXISTS groups (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    icon_url TEXT,
    created_by_user_id INT NOT NULL REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
    conversation_participants_id INT NOT NULL REFERENCES conversation_participants(id) ON UPDATE CASCADE ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    deleted_at TIMESTAMP
);
-- -------------------------
-- Table group_members
-- -------------------------
DROP TABLE IF EXISTS group_members;
--
--
CREATE TABLE IF NOT EXISTS group_members (
    id SERIAL PRIMARY KEY,
    group_id INT NOT NULL REFERENCES groups(id) ON UPDATE CASCADE ON DELETE CASCADE,
    user_id INT NOT NULL REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
    user_role INT NOT NULL DEFAULT 2,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    deleted_at TIMESTAMP
);