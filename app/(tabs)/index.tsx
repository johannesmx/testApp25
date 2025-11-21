import { Platform, StyleSheet, FlatList } from 'react-native';
import { useContext, useState, useEffect } from 'react';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DataContext } from '@/contexts/DataContext';
import { Item } from '@/interfaces/ItemInterface'

import { collection, Firestore, getDocs } from 'firebase/firestore';

export default function HomeScreen() {
  const [data,setData] = useState<Item[]>([])
  const [loaded,setLoaded] = useState<boolean>(false)
  // initialise firestore through context
  const db:any = useContext( DataContext )

  const getData = async () => {
    const fsdata = await getDocs( collection(db, "shared") )
    let items:Item[] = []
    fsdata.forEach( (fsdoc) => {
      let item:any = fsdoc.data()
      item.id = fsdoc.id
      items.push( item )
    })
    setData( items )
    //console.log("data")
  }

  interface ListItemProps {
    title:string
    id:string
  }

  const ListItem = (props:ListItemProps) => {
    return (
      <ThemedView>
        <ThemedText>{ props.title }</ThemedText>
      </ThemedView>
    )
  }

  useEffect( () => {
    //getData()
    if(loaded==false) {
      getData()
      setLoaded(true)
    }
  },[])

  return (
    <SafeAreaView style={styles.container}>
      <ThemedView>
        <ThemedText>Home Screen</ThemedText>
        <FlatList
          data={data}
          renderItem={ ({item}) => <ListItem title={ item.name } id={ item.id }/> }
          keyExtractor={ item => item.id }
        />
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
