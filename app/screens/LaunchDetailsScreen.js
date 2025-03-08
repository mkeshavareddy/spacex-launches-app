import React, { useState, useEffect } from 'react';
import {View,Text,TextInput,FlatList,TouchableOpacity,ActivityIndicator,StyleSheet} from 'react-native';
import { getLaunches } from '../services/spacexApi';

const LaunchListScreen = ({ navigation }) => {
  const [launches, setLaunches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // NEW: filterType state
  const [filterType, setFilterType] = useState('all');
  // possible values: 'all', 'past', 'upcoming', 'success', 'failed'

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

  // Filter based on filterType & searchQuery
  const filteredLaunches = () => {
    return launches
      .filter((launch) => {
        // search by name
        if (searchQuery) {
          const nameLower = launch.name.toLowerCase();
          const queryLower = searchQuery.toLowerCase();
          if (!nameLower.includes(queryLower)) {
            return false;
          }
        }
        // filter by past, upcoming, success, or fail
        if (filterType === 'past') {
          return new Date(launch.date_utc) < new Date();
        } else if (filterType === 'upcoming') {
          return new Date(launch.date_utc) > new Date();
        } else if (filterType === 'success') {
          return launch.success === true;
        } else if (filterType === 'failed') {
          return launch.success === false;
        }
        return true; // 'all'
      })
      .sort((a, b) => new Date(b.date_utc) - new Date(a.date_utc)); // example sort by most recent
  };

  const renderLaunchItem = ({ item }) => (
    <TouchableOpacity
      style={styles.launchItem}
      onPress={() => navigation.navigate('LaunchDetails', { launch: item })}
    >
      <Text style={styles.missionName}>{item.name}</Text>
      <Text style={styles.date}>{new Date(item.date_utc).toDateString()}</Text>
    </TouchableOpacity>
  );

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
      {/* Title at the top (if desired) */}
      <Text style={styles.title}>LaunchList</Text>

      {/* Search bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search launches..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* Filter Buttons Row */}
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[
            styles.filterButton,
            filterType === 'all' && styles.activeFilter,
          ]}
          onPress={() => setFilterType('all')}
        >
          <Text style={styles.filterText}>All</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterButton,
            filterType === 'past' && styles.activeFilter,
          ]}
          onPress={() => setFilterType('past')}
        >
          <Text style={styles.filterText}>Past</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterButton,
            filterType === 'upcoming' && styles.activeFilter,
          ]}
          onPress={() => setFilterType('upcoming')}
        >
          <Text style={styles.filterText}>Upcoming</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterButton,
            filterType === 'success' && styles.activeFilter,
          ]}
          onPress={() => setFilterType('success')}
          >
          <Text style={styles.filterText}>Success</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterButton,
            filterType === 'failed' && styles.activeFilter,
          ]}
          onPress={() => setFilterType('failed')}
        >
          <Text style={styles.filterText}>Failed</Text>
        </TouchableOpacity>
      </View>

      {/* Launches List */}
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
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20, 
    fontWeight: 'bold', 
    marginBottom: 8,
  },
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 8,
    marginBottom: 12,
    borderRadius: 5,
  },
  filterContainer: {
    flexDirection: 'row',
    marginBottom: 12,
    justifyContent: 'space-between',
  },
  filterButton: {
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 5,
    backgroundColor: '#f5f5f5',
  },
  activeFilter: {
    backgroundColor: '#ffcc00',
  },
  filterText: {
    fontWeight: 'bold',
    fontSize: 12,
  },
  launchItem: {
    marginBottom: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    backgroundColor: '#fff',
  },
  missionName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 14,
    marginTop: 4,
    color: '#555',
  },
});
