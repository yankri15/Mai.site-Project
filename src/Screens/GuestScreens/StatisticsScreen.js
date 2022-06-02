import { collection, getDocs } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { SafeAreaView, Text, Dimensions } from "react-native";
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
  const [usersList, setUsersList] = useState({});
  const [projectsList, setProjectsList] = useState({});
  const [classList, setClassList] = useState({});
  useEffect(() => {
    const getUsers = async () => {
      setUsersList({});
      setUserCount(0);
      let res = {};
      let classRes = {};
      let ucount = 0;
      const docRef = collection(db, "users");
      const docSnap = await getDocs(docRef);
      docSnap.docs.forEach((element) => {
        if (element.data().status === 2) {
          if (element.data().neighborhood in res) {
            res[element.data().neighborhood] += 1;
          } else {
            res[element.data().neighborhood] = 1;
          }
          if (element.data().class in classRes) {
            classRes[element.data().class] += 1;
          } else {
            classRes[element.data().class] = 1;
          }
          ucount++;
          setUserCount(ucount);
        }
      });
      setUsersList(res);
      setClassList(classRes);
    };

    const getProjectsForStat = async () => {
      setProjectsCount(0);
      setProjectsList({});
      let res = {};
      let pcount = 0;
      const docRef = collection(db, "projects");
      const docSnap = await getDocs(docRef);
      docSnap.docs.forEach((element) => {
        element.data().tags.forEach((tag) => {
          if (tag.name in res) {
            res[tag.name] += 1;
          } else {
            res[tag.name] = 1;
          }
        });
        pcount++;
        setProjectsCount(pcount);
      });
      setProjectsList(res);
    };

    getUsers().catch(console.error);
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
      <Text>{userCount}</Text>
      <Text>יזמים</Text>

      <Text>{projectsCount}</Text>
      <Text>פרויקטים באוויר</Text>
      <Text>פרויקטים בחלוקה לנושאים:</Text>
      <BarChart
        data={projectsData}
        width={Dimensions.get("window").width - 16}
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
      <Text>פילוח לפי כיתה:</Text>
      
      {/* {console.log(classList)} */}
    </SafeAreaView>
  );
};

export default StatisticsScreen;
