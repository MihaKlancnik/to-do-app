import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { useTaskContext } from '../context/TaskContext';
import { format } from 'date-fns';

const TaskDetailsScreen = ({ route }) => {
  const { taskId } = route.params;
  const { tasks } = useTaskContext();
  
  const task = tasks.find(t => t.id === taskId);
  
  if (!task) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Opravilo ni bilo najdeno</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.card}>
          <Text style={styles.title}>{task.name}</Text>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Kategorija:</Text>
            <Text style={styles.sectionContent}>{task.category}</Text>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Rok:</Text>
            <Text style={styles.sectionContent}>
              {format(new Date(task.dueDate), 'dd.MM.yyyy')}
            </Text>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Opomnik:</Text>
            <Text style={styles.sectionContent}>
              {format(new Date(task.reminderDate), 'dd.MM.yyyy')}
            </Text>
          </View>
          
          <View style={styles.descriptionSection}>
            <Text style={styles.sectionTitle}>Opis:</Text>
            <Text style={styles.description}>{task.description}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  contentContainer: {
    padding: 16,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    elevation: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  section: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    width: 100,
  },
  sectionContent: {
    fontSize: 16,
    flex: 1,
  },
  descriptionSection: {
    marginTop: 8,
  },
  description: {
    fontSize: 16,
    marginTop: 8,
    lineHeight: 24,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: '#F44336',
  },
});

export default TaskDetailsScreen;