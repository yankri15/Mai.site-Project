import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { SafeAreaView, Text, Dimensions, ScrollView } from "react-native";
import { db } from "../../../firebase";
import { globalStyles } from "../../styles/global";
import {
  BarChart,
  PieChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";

const StatisticsScreen = () => {
  const [userCount, setUserCount] = useState(0);
  const [projectsCount, setProjectsCount] = useState(0);
  const [usersNeighborhoods, setUsersNeighborhoods] = useState([]);
  const [projectsList, setProjectsList] = useState({});
  const [classList, setClassList] = useState([]);
  const supportedClasses = ["ט", "י", "יא", "יב"];

  function generateRGB() {
    return (
      "rgb(" +
      Math.floor(Math.random() * 256) +
      ", " +
      Math.floor(Math.random() * 256) +
      ", " +
      Math.floor(Math.random() * 256) +
      ")"
    );
  }
  useEffect(() => {
    const getUsers = async () => {
      setUsersNeighborhoods([]);

      const q = query(collection(db, "users"), where("status", "==", 2));
      const docSnap = await getDocs(q);
      setUserCount(docSnap.docs.length);

      const classesData = supportedClasses.map((item) => {
        return {
          name: item,
          amount: 0,
          color: generateRGB(),
          legendFontColor: "#000",
          legendFontSize: 15,
        };
      });

      const ref = collection(db, "neighborhoods");
      const snap = await getDocs(ref);
      const neighborhoodsList = snap.docs[0].data().neighborhoods;
      const neighborhoodData = neighborhoodsList.map((neighborhood) => {
        return {
          name: neighborhood,
          population: 0,
          color: generateRGB(),
          legendFontColor: "#000",
          legendFontSize: 15,
        };
      });

      docSnap.docs.forEach((element) => {
        for (let i = 0; i < neighborhoodData.length; i++) {
          if (neighborhoodData[i]["name"] == element.data().neighborhood) {
            neighborhoodData[i]["population"] += 1;
          }
          if (classesData[i]) {
            if (classesData[i]["name"] == element.data().class) {
              classesData[i]["amount"] += 1;
            }
          }
        }
      });
      setClassList(classesData);
      const sortedData = []
        .concat(neighborhoodData)
        .sort((a, b) => (a.population < b.population ? 1 : -1));

      const res = sortedData.slice(4).reduce(function (acc, obj) {
        return acc + obj.population;
      }, 0);
      sortedData.splice(4, 0, {
        name: "אחר",
        population: res,
        color: generateRGB(),
        legendFontColor: "#000",
        legendFontSize: 15,
      });
      setUsersNeighborhoods(sortedData.slice(0, 5));
    };

    const getProjectsForStat = async () => {
      setProjectsList({});
      let res = {};
      const docRef = collection(db, "projects");
      const docSnap = await getDocs(docRef);
      setProjectsCount(docSnap.docs.length);
      docSnap.docs.forEach((element) => {
        element.data().tags.forEach((tag) => {
          if (tag.name in res) {
            res[tag.name] += 1;
          } else {
            res[tag.name] = 1;
          }
        });
      });
      setProjectsList(res);
    };

    getUsers()
      .catch(console.error)
      .then(() => {});
    getProjectsForStat().catch(console.error);

    return;
  }, []);

  const projectsData = {
    labels: Object.keys(projectsList),
    datasets: [
      {
        data: Object.values(projectsList),
      },
    ],
  };

  return (
    <SafeAreaView style={globalStyles.settingsContainer}>
      <ScrollView contentContainerStyle={{ alignItems: "center" }}>
        <Text>{userCount}</Text>
        <Text>יזמים</Text>

        <Text>{projectsCount}</Text>
        <Text>פרויקטים באוויר</Text>
        <Text>התפלגות פרוייקטים לפי נושאים:</Text>
        <BarChart
          data={projectsData}
          width={Dimensions.get("window").width * 0.95}
          height={350}
          fromZero={true}
          chartConfig={{
            padding: 0,
            backgroundGradientFrom: "#373F47",
            backgroundGradientTo: "#373F47",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,

            barPercentage: 0.4,
          }}
          style={{
            borderRadius: 16,
          }}
          verticalLabelRotation={37}
        />
        <Text>פילוח לפי שכונת מגורים:</Text>
        <PieChart
          data={usersNeighborhoods}
          width={Dimensions.get("window").width}
          height={Dimensions.get("window").width * 0.5}
          chartConfig={{
            padding: 0,
            backgroundGradientFrom: "#373F47",
            backgroundGradientTo: "#373F47",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          }}
          accessor={"population"}
          backgroundColor={"transparent"}
          // paddingLeft={"15"}
          // center={[10, 50]}
        />
        <Text>פילוח לפי כיתה:</Text>
        <PieChart
          data={classList}
          width={Dimensions.get("window").width}
          height={Dimensions.get("window").width * 0.5}
          chartConfig={{
            padding: 0,
            backgroundGradientFrom: "#373F47",
            backgroundGradientTo: "#373F47",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          }}
          accessor={"amount"}
          backgroundColor={"transparent"}
          // paddingLeft={"15"}
          // center={[10, 50]}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default StatisticsScreen;
