import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Operation = '+' | '-' | '×' | '÷' | null;

export default function CalculatorScreen() {
  const [display, setDisplay] = useState('0');
  const [firstNumber, setFirstNumber] = useState('');
  const [operation, setOperation] = useState<Operation>(null);
  const [newNumberStarted, setNewNumberStarted] = useState(false);

  const handleNumberPress = (num: string) => {
    if (display === '0' || newNumberStarted) {
      setDisplay(num);
      setNewNumberStarted(false);
    } else {
      setDisplay(display + num);
    }
  };

  const handleOperationPress = (op: Operation) => {
    setOperation(op);
    setFirstNumber(display);
    setNewNumberStarted(true);
  };

  const handleEqualsPress = () => {
    const num1 = parseFloat(firstNumber);
    const num2 = parseFloat(display);
    let result = 0;

    switch (operation) {
      case '+':
        result = num1 + num2;
        break;
      case '-':
        result = num1 - num2;
        break;
      case '×':
        result = num1 * num2;
        break;
      case '÷':
        result = num1 / num2;
        break;
    }

    setDisplay(result.toString());
    setOperation(null);
    setNewNumberStarted(true);
  };

  const handleClear = () => {
    setDisplay('0');
    setFirstNumber('');
    setOperation(null);
    setNewNumberStarted(false);
  };

  const Button = ({ text, type = 'number', span = false }) => (
    <Pressable
      style={[
        styles.button,
        type === 'operation' && styles.operationButton,
        span && styles.spanButton,
      ]}
      onPress={() => {
        if (type === 'number') handleNumberPress(text);
        else if (type === 'operation') handleOperationPress(text as Operation);
        else if (type === 'equals') handleEqualsPress();
        else if (type === 'clear') handleClear();
      }}
    >
      <Text
        style={[
          styles.buttonText,
          type === 'operation' && styles.operationButtonText,
        ]}
      >
        {text}
      </Text>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.display}>
        <Text style={styles.displayText}>{display}</Text>
      </View>
      <View style={styles.buttonGrid}>
        <View style={styles.row}>
          <Button text="C" type="clear" />
          <Button text="±" type="operation" />
          <Button text="%" type="operation" />
          <Button text="÷" type="operation" />
        </View>
        <View style={styles.row}>
          <Button text="7" />
          <Button text="8" />
          <Button text="9" />
          <Button text="×" type="operation" />
        </View>
        <View style={styles.row}>
          <Button text="4" />
          <Button text="5" />
          <Button text="6" />
          <Button text="-" type="operation" />
        </View>
        <View style={styles.row}>
          <Button text="1" />
          <Button text="2" />
          <Button text="3" />
          <Button text="+" type="operation" />
        </View>
        <View style={styles.row}>
          <Button text="0" span />
          <Button text="." />
          <Button text="=" type="equals" />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  display: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 20,
    backgroundColor: '#1a1a1a',
  },
  displayText: {
    color: '#fff',
    fontSize: 64,
    textAlign: 'right',
    fontWeight: '300',
  },
  buttonGrid: {
    padding: Platform.OS === 'web' ? 20 : 10,
  },
  row: {
    flexDirection: 'row',
    marginBottom: Platform.OS === 'web' ? 20 : 10,
  },
  button: {
    flex: 1,
    aspectRatio: 1,
    backgroundColor: '#333',
    borderRadius: 999,
    margin: Platform.OS === 'web' ? 10 : 5,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      web: {
        cursor: 'pointer',
        transition: 'background-color 0.2s',
        ':hover': {
          backgroundColor: '#444',
        },
      },
    }),
  },
  spanButton: {
    flex: 2.2,
    aspectRatio: 2.2,
  },
  operationButton: {
    backgroundColor: '#ff9f0a',
  },
  buttonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '500',
  },
  operationButtonText: {
    color: '#fff',
  },
});
