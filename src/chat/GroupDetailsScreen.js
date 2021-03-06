/* @flow */
import React, { PureComponent } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';

import type { Actions } from '../types';
import connectWithActions from '../connectWithActions';
import { Screen, Label } from '../common';
import UserItem from '../users/UserItem';
import { BRAND_COLOR } from '../styles';

const componentStyles = StyleSheet.create({
  heading: {
    color: BRAND_COLOR,
    margin: 8,
    fontWeight: 'bold',
  },
});

type Props = {
  navigation: Object,
  actions: Actions,
};

class GroupDetailsScreen extends PureComponent<Props> {
  static contextTypes = {
    styles: () => null,
  };

  props: Props;

  handlePress = (email: string) => {
    const { actions } = this.props;
    actions.navigateToAccountDetails(email);
  };

  render() {
    const { navigation } = this.props;
    const { recipients } = navigation.state.params;
    const title = {
      text: '{_}',
      values: {
        _: 'Group details',
      },
    };

    return (
      <Screen title={title}>
        <View style={this.context.styles.cardView}>
          <Label style={componentStyles.heading} text="Members" />
          <FlatList
            initialNumToRender={10}
            data={recipients}
            keyExtractor={item => item.email}
            renderItem={({ item }) => (
              <UserItem
                key={item.email}
                fullName={item.fullName}
                avatarUrl={item.avatarUrl}
                email={item.email}
                showEmail
                onPress={() => this.handlePress(item.email)}
              />
            )}
          />
        </View>
      </Screen>
    );
  }
}

export default connectWithActions(null)(GroupDetailsScreen);
