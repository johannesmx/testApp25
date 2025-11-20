
import { Platform, StyleSheet, Pressable, Modal, useColorScheme, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { ThemedInput } from '@/components/themed-input';
import { ThemedButton } from '@/components/themed-button';
import Ionicons from '@expo/vector-icons/Ionicons' 
import { Item } from '@/interfaces/ItemInterface';
import { AuthContext } from '@/contexts/AuthContext';
import { DataContext } from '@/contexts/DataContext';
import { useContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc, getDocs, collection } from 'firebase/firestore'


export default function UserData() {
  const [userId, setUserId] = useState<string>("")
  const [docName, setDocName] = useState<string>("")
  const [docDesc, setDocDesc] = useState<string>("")
  // modal controller
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  // data display
  const [userdata,setUserData] = useState< Item[] >([])
  const [loaded,setLoaded] = useState<boolean>(false)

  const auth: any = useContext(AuthContext)
  const db: any = useContext(DataContext)
  const scheme = useColorScheme()
  // console.log(scheme)
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUserId(user.uid)
      console.log(user.uid)
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
  // get data from firestore and add it to the userdata state
  const getData = async () => {
   //if(!userId) { return }
    const path = `userdata/${userId}/trackerdata`
    const fsdata = await getDocs( collection(db, path) )
    console.log(fsdata)
    let items:Item[] = []
    fsdata.forEach( (fsdoc) => {
      let item:any = fsdoc.data()
      item.id = fsdoc.id
      items.push( item )
    })
    setUserData( items )
    console.log(items)
  }

  const addData = async (name: string, description: string) => {
    const path = `userdata/${userId}/trackerdata`
    const docId: string = (new Date).getTime().toString()
    await setDoc(doc(db, path, docId), {
      name, description
    })
    console.log("success")
    setModalOpen(false)
    setDocName("")
    setDocDesc("")
    // add data to local state
    let data = userdata
    data.push({id: docId, name: name, description: description})
    setUserData(data)
  }

  useEffect( () => {
    if(!loaded && userId) {
      getData()
      setLoaded(true)
    }
  }, [userId])

  return (
    <SafeAreaView style={styles.container}>
      <Modal 
        visible={modalOpen}  
        animationType="slide"
        backdropColor={ (scheme=='dark') ? "#333333" : "#CCCCCC"}
      >
        <ThemedView>
          <ThemedText>Add data to user's collection</ThemedText>
          <ThemedText>item name</ThemedText>
          <ThemedInput
            value={docName}
            onChangeText={(value) => setDocName(value)}
          />
          <ThemedText>item description</ThemedText>
          <ThemedInput
            value={docDesc}
            onChangeText={(value) => setDocDesc(value)}
          />
          <ThemedButton text="Add" onPress={() => { addData(docName, docDesc) }} />
          <ThemedButton text="Close" onPress={() => { setModalOpen(false) }} />
        </ThemedView>
      </Modal>
      <Pressable style={ styles.button } onPress={ () => setModalOpen(true)}>
        <Ionicons name='add' size={32} color="#333333" />
      </Pressable>
      <FlatList 
        data={userdata} 
        renderItem={ ({item}) => <ListItem title={ item.name } id={ item.id }/>} 
        keyExtractor={  item => item.id  }
      />
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
  button: {
    backgroundColor: "#CCCCCC",
    width: 40,
    height: 40,
    borderRadius: 10,
    position: "absolute",
    bottom: 30,
    right: 30,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex:999
  }
});
