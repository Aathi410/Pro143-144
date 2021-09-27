import React, { Component } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Card } from "react-native-elements";
import axios from "axios";
import { RFValue } from "react-native-responsive-fontsize";

export default class PopularArticles extends Component{
  constructor(props){
      super(props)
      this.state = {
          data : []
      }
  }

  componentDidMount(){
    this.getData()
  }

  getData=()=>{
    const url = ''
    axios
      .get(url)
      .then(response=>{
        this.setState({data : response.data.data});
      })
      .catch(error=>{
        console.log(error.message)
      });
  };

  keyExtractor = (item, index) => index.toString();

  renderItem=({item,index})=>{
    return(
      <Card 
        key = {`card ${index}`}
        featuredTitle = {item.title}
        containerStyle = {styles.cardContainer}
        featuredTitleStyle = {styles.title}
        featuredSubtitle = {
          item.lang,' ',item.total_events
        }
        featuredSubtitleStyle = {styles.subtitle}
      ></Card>
    );
  };

  render(){
      const {data} = this.state
      return (
          <View style = {styles.container}>
              <FlatList
                data = {data}
                renderItem = {this.renderItem}
                keyExtractor = {this.keyExtractor}
              />
          </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  title: {
    color: "#fff",
    alignSelf: "flex-start",
    paddingLeft: RFValue(15),
    fontSize: RFValue(25),
    marginTop: RFValue(65)
  },
  subtitle: {
    fontWeight: "bold",
    alignSelf: "flex-start",
    paddingLeft: RFValue(15),
    fontSize: RFValue(15),
    color : 'black'
  },
  cardContainer: {
    flex: 1,
    borderRadius: RFValue(10),
    justifyContent: "center",
    marginBottom: RFValue(20)
  }
});