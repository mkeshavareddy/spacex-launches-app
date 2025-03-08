// app/screens/LaunchDetailsScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { getRocketById } from '../services/spacexApi';

const LaunchDetailsScreen = ({ route, navigation }) => {
  const [rocketDetails, setRocketDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // The "launch" object is passed from the List screen
  const { launch } = route.params;
  const { name, date_utc, success, rocket, details, links } = launch;
  // "links.patch.small" or "links.patch.large" can be used for mission patch images

  useEffect(() => {
    navigation.setOptions({ title: name }); // Set screen title dynamically
    fetchRocketDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchRocketDetails = async () => {
    try {
      setLoading(true);
      const rocketData = await getRocketById(rocket);
      setRocketDetails(rocketData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Mission Patch */}
      {links && links.patch && links.patch.small && (
        <Image source={{ uri: links.patch.small }} style={styles.missionPatch} />
      )}

      <Text style={styles.title}>{name}</Text>
      <Text style={styles.subTitle}>
        {new Date(date_utc).toLocaleString()}
      </Text>
      {success !== null && (
        <Text>
          <Text style={styles.label}>Launch Success: </Text>
          {success ? 'Yes' : 'No'}
        </Text>
      )}
      {details && (
        <Text>
          <Text style={styles.label}>Details: </Text>
          {details}
        </Text>
      )}

      {/* Rocket Details */}
      {rocketDetails && (
        <View style={styles.rocketContainer}>
          <Text style={styles.rocketTitle}>Rocket Information</Text>
          <Text style={styles.rocketText}>
            <Text style={styles.label}>Name: </Text>
            {rocketDetails.name}
          </Text>
          <Text style={styles.rocketText}>
            <Text style={styles.label}>Company: </Text>
            {rocketDetails.company}
          </Text>
          <Text style={styles.rocketText}>
            <Text style={styles.label}>Height: </Text>
            {rocketDetails.height?.meters} m
          </Text>
          <Text style={styles.rocketText}>
            <Text style={styles.label}>Diameter: </Text>
            {rocketDetails.diameter?.meters} m
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

export default LaunchDetailsScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  missionPatch: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subTitle: {
    fontSize: 16,
    marginBottom: 8,
  },
  label: {
    fontWeight: 'bold',
  },
  rocketContainer: {
    marginTop: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
  },
  rocketTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  rocketText: {
    marginBottom: 4,
  },
});
