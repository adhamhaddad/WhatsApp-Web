import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import HomePage from '@pages/home';
import ProfilePage from '@pages/profile';
import ContactInfoPage from '@pages/contactInfo';
import SettingsPage from '@pages/settings';
import NewGroupPage from '@pages/newGroup';
import NewCommunityPage from '@pages/newCommunity';
import StarredMessagesPage from '@pages/starredMessages';
import CommunitiesPage from '@pages/community';
import NewChatPage from '@pages/newChat';
import PrivacyPage from '@pages/privacy';
import SecurityPage from '@pages/security';
import NotificationsPage from '@pages/notifications';

const Routes = ({ handleCurrentChat }) => {
  return (
    <Switch>
      <Route path='/login' exact>
        <Redirect to='/' />
      </Route>
      <Route path='/register' exact>
        <Redirect to='/' />
      </Route>
      <Route
        exact
        path='/'
        render={() => <HomePage handleCurrentChat={handleCurrentChat} />}
      />
      <Route exact path='/profile' component={ProfilePage} />
      <Route exact path='/contact-info/:id' component={ContactInfoPage} />
      <Route
        exact
        path='/new-chat'
        render={() => <NewChatPage handleCurrentChat={handleCurrentChat} />}
      />
      <Route exact path='/new-group' component={NewGroupPage} />
      <Route exact path='/new-community' component={NewCommunityPage} />
      <Route exact path='/starred-messages' component={StarredMessagesPage} />
      <Route exact path='/communities' component={CommunitiesPage} />
      <Route exact path='/settings' component={SettingsPage} />
      <Route exact path='/notifications' component={NotificationsPage} />
      <Route exact path='/privacy' component={PrivacyPage} />
      <Route exact path='/security' component={SecurityPage} />
    </Switch>
  );
};
export default Routes;
