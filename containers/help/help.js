import React, {Component} from 'react';
import {
  Text,
  View,
  FlatList,
  SafeAreaView,
  Image,
  ScrollView,
} from 'react-native';
import styles from './styles';
import colors from '../../constants/colors';
import Back from '../../components/back';
import i18n from '../../utils/language';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import {Thumbnail, List, ListItem, Separator} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
export default class HelloWorldApp extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Back
          onPress={() => this.props.navigation.navigate('DrawerMenu')}
          title={i18n.t('help')}
        />
        <View style={styles.center}>
          <MaterialIcons name="help-outline" size={50} color={colors.primary} />
        </View>
        <ScrollView>
          <Collapse>
            <CollapseHeader style={{height: 40}}>
              <Separator bordered style={styles.headbg}>
                <Text>{i18n.t('howToUse')}</Text>
              </Separator>
            </CollapseHeader>
            <CollapseBody style={{paddingTop: 8}}>
              <Text style={styles.handleRightLeft}>{i18n.t('steps1')}</Text>
              <Text style={styles.handleRightLeft}>{i18n.t('steps2')}</Text>
              <Text style={styles.handleRightLeft}>{i18n.t('steps3')}</Text>
              <Text style={styles.handleRightLeft}>{i18n.t('steps4')}</Text>
              <Text style={styles.handleRightLeft}>{i18n.t('steps5')}</Text>
              <Text style={styles.handleRightLeft}>{i18n.t('steps6')}</Text>
              <Text style={styles.handleRightLeft}>{i18n.t('steps7')}</Text>
            </CollapseBody>
          </Collapse>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
