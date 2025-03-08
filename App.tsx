
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import TaskListScreen from './screens/TaskListScreen';
import TaskDetailsScreen from './screens/TaskDetailsScreen';
import AddTaskScreen from './screens/AddTaskScreen';
import { TaskProvider } from './context/TaskContext';

const Stack = createStackNavigator();

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <TaskProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="TaskList">
              <Stack.Screen 
                name="TaskList" 
                component={TaskListScreen} 
                options={{ title: 'Seznam opravil' }}
              />
              <Stack.Screen 
                name="TaskDetails" 
                component={TaskDetailsScreen}
                options={{ title: 'Podrobnosti opravila' }}
              />
              <Stack.Screen 
                name="AddTask" 
                component={AddTaskScreen}
                options={{ title: 'Dodaj opravilo' }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </TaskProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}

export default App;