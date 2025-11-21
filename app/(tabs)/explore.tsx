
import { Platform, StyleSheet, TextInput, Pressable, useColorScheme, Modal, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { ThemedButton } from '@/components/themed-button';
import { AuthContext } from '@/contexts/AuthContext';
import { DataContext } from '@/contexts/DataContext';
import { useContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc, collection, getDocs } from 'firebase/firestore'
import Ionicons from '@expo/vector-icons/Ionicons';
import { Item } from '@/interfaces/ItemInterface';
import { Link } from 'expo-router';


export default function TabTwoScreen() {
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [userId, setUserId] = useState<string>("")
  const [docName, setDocName] = useState<string>("")
  const [docDesc, setDocDesc] = useState<string>("")
  // modal controller
  // data display
  const [userdata,setUserData] = useState< Item[] >([])
  const [loaded,setLoaded] = useState<boolean>(false)

  const auth: any = useContext(AuthContext)
  const db: any = useContext(DataContext)
  const scheme = useColorScheme()
 

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUserId(user.uid)
    }
    else {
      // user is not authenticated
      // navigate to sign in
    }
  })

  interface UserItem {
    name: string
    description: string
  }

  const addData = async (name: string, description: string) => {
    const path = `userdata/${userId}/trackerdata`
    const docId: string = (new Date).getTime().toString()
    await setDoc(doc(db, path, docId), {
      name, description
    })
    // set document to show in interface
    const newDoc = {id: docId, name: name, description: description }
    setUserData([...userdata, newDoc ])
    setDocName("")
    setDocDesc("")
  }

  // get existing data from Firebase
  const getData = async () => {
    if( !userId ) { return }
    const path = `userdata/${userId}/trackerdata`
    const fsdata = await getDocs( collection(db, path) )
    let items:Item[] = []
    fsdata.forEach( (fsdoc) => {
      let item:any = fsdoc.data()
      item.id = fsdoc.id
      items.push( item )
    })
    setUserData( items )
  }

  useEffect( () => {
    if( userId ) {
      getData()
    }
  },[userId])

  return (
    <SafeAreaView style={styles.container}>
      <Modal
        visible={ modalOpen }
        backdropColor={"black"}
        transparent={true}
      >
        <ThemedView style={{ padding:20 }}>
          <ThemedText>Add data to user's collection</ThemedText>
          <ThemedText>item name</ThemedText>
          <TextInput
            style={
              (scheme == 'dark') ?
                [styles.input, styles.inputDark] :
                [styles.input, styles.inputLight]
            }
            value={docName}
            onChangeText={(value) => setDocName(value)}
          />
          <ThemedText>item description</ThemedText>
          <TextInput
            style={
              (scheme == 'dark') ?
                [styles.input, styles.inputDark] :
                [styles.input, styles.inputLight]
            }
            value={docDesc}
            multiline={true}
            onChangeText={(value) => setDocDesc(value)}
          />
          <ThemedButton text="Add" onPress={() => { 
            addData(docName, docDesc) 
            setModalOpen(false)
          }} />
          <ThemedButton text="Cancel" onPress={() => setModalOpen(false) } />
        </ThemedView>
      </Modal>
      <FlatList 
        data={ userdata } 
        extraData={ userdata }
        renderItem={ ({item}) => (
          <Link href={{
            pathname: '/(tabs)/[id].tsx',
            params: { id: item.id }
          }}>
            <ThemedText>{item.name}</ThemedText>
          </Link>
        )}
        keyExtractor={item => item.id }
      />
      <Pressable style={ styles.floatingButton } onPress={() => setModalOpen(true)}>
        <Ionicons name="add" size={40} color={ (scheme == 'dark') ? "white" : "#333333"} />
      </Pressable>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  input: {
    borderStyle: "solid",
    padding: 5,
    borderWidth: 2,
    borderRadius: 4,
  },
  inputDark: {
    color: "white",
    borderColor: "#CCCCCC",
  },
  inputLight: {
    color: "black",
    borderColor: "#333333",
  },
  floatingButton: {
    position: "absolute",
    right: 30,
    bottom: 30,
    borderColor: "#CCCCCC",
    borderStyle: "solid",
    borderWidth: 2,
    width: 50,
    height: 50,
    borderRadius: "50%",
    alignItems: "center",
    justifyContent: "center",
  }
});
