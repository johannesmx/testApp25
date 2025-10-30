import { Platform, StyleSheet } from 'react-native';
import { useContext, useState, useEffect } from 'react';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DataContext } from '@/contexts/DataContext';

import { collection, Firestore, getDocs } from 'firebase/firestore';

export default function HomeScreen() {
  const [data,setData] = useState([])
  // initialise firestore through context
  const db:any = useContext( DataContext )

  const getData = async () => {
    const fsdata = await getDocs( collection(db, "shared") )
    let items = []
    fsdata.forEach( (fsdoc) => {
      let item = fsdoc.data()
      item.id = fsdoc.id
      items.push( item )
    })
    setData( items )
  }


  return (
    <SafeAreaView style={styles.container}>
      <ThemedView>
        <ThemedText>Home Screen</ThemedText>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
