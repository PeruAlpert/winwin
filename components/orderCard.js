import React, {Component} from 'react';
import {View, Image, Text, TouchableOpacity, Dimensions} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../constants/colors';
const {width, height} = Dimensions.get('window');
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
export default class HelloWorldApp extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const {
      img,
      orderDesc,
      brandName,
      date,
      branchName,
      orderQuantity,
      history,
      onPress,
    } = this.props;
    return (
      <View
        style={{
          flex: 1,
          marginVertical: 4,
          backgroundColor: colors.white,
          marginHorizontal: 10,
          overflow: 'hidden',
          padding: 10,
          borderRadius: 10,
          marginTop: 20,
          borderWidth: 0.3,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}>
        <Collapse>
          <CollapseHeader>
            <View>
              <View
                style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  source={{uri: img}}
                  style={{
                    height: 100,
                    width: 100,
                    marginVertical: 10,
                    marginHorizontal: 10,
                  }}
                  resizeMode="stretch"
                />
                <View
                  style={{
                    flex: 1,
                    paddingLeft: 10,
                    marginVertical: 2,
                  }}>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginVertical: 2,
                    }}>
                    <Text style={{marginLeft: 2, flex: 1, textAlign: 'center'}}>
                      {brandName}
                    </Text>
                    {date == null ? null : (
                      <Text
                        style={{flex: 1}}
                        numberOfLines={1}
                        ellipsizeMode="tail">
                        {date}
                      </Text>
                    )}
                  </View>
                  <View
                    style={{
                      marginVertical: 5,
                      width: width * 0.5,
                      backgroundColor: colors.orange,
                      paddingVertical: 3,
                      borderRadius: 10,
                      alignSelf: 'center',
                    }}>
                    <Text
                      style={{
                        marginVertical: 5,
                        textAlign: 'center',
                        fontWeight: 'bold',
                        fontSize: 13,
                        color: colors.white,
                      }}>
                      {orderDesc}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </CollapseHeader>
          {date == null ? (
            <View></View>
          ) : (
            <CollapseBody style={{marginTop: 5}}>
              <View style={{flex: 1}}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginHorizontal: 20,
                  }}>
                  <Text>Branch Location:</Text>
                  <Text
                    style={{flex: 1}}
                    numberOfLines={1}
                    ellipsizeMode="tail">
                    {branchName}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginHorizontal: 20,
                  }}>
                  <Text>Quantity:</Text>
                  <Text>{orderQuantity}</Text>
                </View>
                <TouchableOpacity
                  onPress={onPress}
                  style={{
                    backgroundColor: colors.error,
                    marginVertical: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 7,
                    marginHorizontal: 20,
                    paddingVertical: 10,
                  }}>
                  <Text style={{color: colors.white}}>CANCEL ORDER</Text>
                </TouchableOpacity>
              </View>
            </CollapseBody>
          )}
        </Collapse>
      </View>
    );
  }
}
