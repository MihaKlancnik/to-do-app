import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  SafeAreaView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { useTaskContext } from '../context/TaskContext';
import { format } from 'date-fns';

const categories = [
  'Služba',
  'Osebno',
  'Zdravje',
  'Finance',
  'Izobraževanje',
  'Drugo'
];

const AddTaskScreen = ({ navigation }) => {
  const { addTask } = useTaskContext();
  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(categories[0]);
  
  const [dueDate, setDueDate] = useState(new Date());
  const [showDueDatePicker, setShowDueDatePicker] = useState(false);
  
  const [reminderDate, setReminderDate] = useState(new Date());
  const [showReminderDatePicker, setShowReminderDatePicker] = useState(false);

  const handleSave = () => {
    if (!name.trim()) {
      Alert.alert('Napaka', 'Prosim vnesite ime opravila.');
      return;
    }

    const newTask = {
      name,
      description,
      category,
      dueDate: dueDate.toISOString(),
      reminderDate: reminderDate.toISOString(),
    };

    addTask(newTask);
    navigation.navigate('TaskList');
  };

  const onDueDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || dueDate;
    setShowDueDatePicker(false);
    setDueDate(currentDate);
  };

  const onReminderDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || reminderDate;
    setShowReminderDatePicker(false);
    setReminderDate(currentDate);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Ime opravila *</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Vnesite ime opravila"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Opis opravila</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={description}
            onChangeText={setDescription}
            placeholder="Vnesite opis opravila"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Kategorija</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={category}
              onValueChange={(itemValue) => setCategory(itemValue)}
              style={styles.picker}
            >
              {categories.map((cat) => (
                <Picker.Item key={cat} label={cat} value={cat} />
              ))}
            </Picker>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Rok opravila</Text>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setShowDueDatePicker(true)}
          >
            <Text style={styles.dateButtonText}>
              {format(dueDate, 'dd.MM.yyyy')}
            </Text>
          </TouchableOpacity>
          {showDueDatePicker && (
            <DateTimePicker
              value={dueDate}
              mode="date"
              display="default"
              onChange={onDueDateChange}
            />
          )}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Datum opomnika</Text>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setShowReminderDatePicker(true)}
          >
            <Text style={styles.dateButtonText}>
              {format(reminderDate, 'dd.MM.yyyy')}
            </Text>
          </TouchableOpacity>
          {showReminderDatePicker && (
            <DateTimePicker
              value={reminderDate}
              mode="date"
              display="default"
              onChange={onReminderDateChange}
            />
          )}
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Shrani opravilo</Text>
        </TouchableOpacity>
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
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  textArea: {
    height: 120,
  },
  pickerContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    overflow: 'hidden',
  },
  picker: {
    height: 50,
  },
  dateButton: {
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  dateButtonText: {
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#2196F3',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default AddTaskScreen;