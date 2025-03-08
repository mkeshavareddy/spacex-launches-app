import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { getLaunches } from '../services/spacexApi';

const LaunchListScreen = ({ navigation }) => {
  const [launches, setLaunches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // NEW: search query
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchLaunches();
  }, []);

  const fetchLaunches = async () => {
    try {
      setLoading(true);
      const data = await getLaunches();
      setLaunches(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Filter logic for search
  const filteredLaunches = () => {
    return launches.filter((launch) => {
      const name = launch.name.toLowerCase();
      const query = searchQuery.toLowerCase();
      return name.includes(query);
    });
  };

  const renderLaunchItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.launchItem}
        onPress={() => navigation.navigate('LaunchDetails', { launch: item })}
      >
        <Text style={styles.missionName}>{item.name}</Text>
        <Text style={styles.date}>{new Date(item.date_utc).toDateString()}</Text>
      </TouchableOpacity>
    );
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
    <View style={styles.container}>
      {/* NEW: Search bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search launches..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* Render filtered list */}
      <FlatList
        data={filteredLaunches()}
        keyExtractor={(item) => item.id}
        renderItem={renderLaunchItem}
      />
    </View>
  );
};

export default LaunchListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 8,
    marginBottom: 12,
    borderRadius: 5,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  launchItem: {
    marginBottom: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
  },
  missionName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 14,
    marginVertical: 4,
  },
});
