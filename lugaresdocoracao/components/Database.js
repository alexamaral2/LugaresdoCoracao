import * as SQLite from 'expo-sqlite';
import NetInfo from '@react-native-community/netinfo';
import { doc, getDoc, setDoc, updateDoc, deleteDoc, getDocs, collection } from 'firebase/firestore/lite';
import { db as dbfirebase } from './firebaseConfig';

const db = SQLite.openDatabase("bd23123123.db");

const initDB = () => {
  db.transaction(tx => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS lugaresdocoracao (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, latitude REAL NOT NULL, longitude REAL NOT NULL, image TEXT NOT NULL, description TEXT NOT NULL);",
      [],
      () => console.log("Tabela criada com sucesso"),
      error => console.log("Erro ao criar tabela: " + error.message)
    );
  });
};

const insertLugar = (title, latitude, longitude, image, description, callback) => {
  db.transaction(tx => {
    tx.executeSql(
      "INSERT INTO lugaresdocoracao (title, latitude, longitude, image, description) VALUES (?, ?, ?, ?, ?);",
      [title, latitude, longitude, image, description],
      (_, result) => callback(true, result),
      (_, error) => callback(false, error)
    );
  });
};

const fetchLugares = callback => {
  db.transaction(tx => {
    tx.executeSql(
      "SELECT * FROM lugaresdocoracao;",
      [],
      (_, { rows }) => callback(true, rows._array),
      (_, error) => callback(false, error)
    );
  });
};

const deleteLugar = (id, callback) => {
  db.transaction(tx => {
    tx.executeSql(
      "DELETE FROM lugaresdocoracao WHERE id = ?;",
      [id],
      (_, result) => callback(true, result),
      (_, error) => callback(false, error)
    );
  });
};

const updateLugar = (id, title, latitude, longitude, image, description, callback) => {
  db.transaction(tx => {
    tx.executeSql(
      "UPDATE lugaresdocoracao SET title = ?, latitude = ?, longitude = ?, image = ?, description = ? WHERE id = ?;",
      [title, latitude, longitude, image, description, id],
      (_, result) => callback(true, result),
      (_, error) => callback(false, error)
    );
  });
};

const deleteLugarFromFirebase = async (id) => {
  const docRef = doc(dbfirebase, 'lugaresdocoracao', id);
  try {
    await deleteDoc(docRef);
    console.log('Lugar excluída do Firebase:', id);
  } catch (error) {
    console.log('Erro ao excluir lugar do Firebase:', error);
  }
};

const syncLugaresWithFirebase = async () => {
  const connection = await NetInfo.fetch();
  if (connection.isConnected) {
    fetchLugares(async (success, lugares) => {
      if (success) {
        const sqliteIds = lugares.map(lugar => lugar.id);
        const firestoreSnapshot = await getDocs(collection(dbfirebase, 'lugaresdocoracao'));
        const firestoreIds = firestoreSnapshot.docs.map(doc => doc.id);
        const idsToDelete = firestoreIds.filter(id => !sqliteIds.includes(parseInt(id)));

        for (const id of idsToDelete) {
          await deleteLugarFromFirebase(id);
        }

        for (const lugar of lugares) {
          const docRef = doc(dbfirebase, 'lugaresdocoracao', `${lugar.id}`);
          try {
            const docSnapshot = await getDoc(docRef);
            if (docSnapshot.exists()) {
              await updateDoc(docRef, {
                title: lugar.title,
                latitude: lugar.latitude,
                longitude: lugar.longitude,
                image: lugar.image,
                description: lugar.description
              });
              console.log('Lugar atualizado no Firebase:', lugar);
            } else {
              await setDoc(docRef, {
                title: lugar.title,
                latitude: lugar.latitude,
                longitude: lugar.longitude,
                image: lugar.image,
                description: lugar.description
              });
              console.log('Lugar adicionado no Firebase:', lugar);
            }
          } catch (error) {
            console.log('Erro ao sincronizar lugar com Firebase:', error);
          }
        }
        console.log('Sincronização dos lugares do SQLite com o Firebase concluída com sucesso.');
      } else {
        console.log('Falha ao buscar lugares do SQLite');
      }
    });
  } else {
    console.log('Sem conexão com a internet. Não é possível sincronizar com o Firebase.');
  }
};

export { initDB, insertLugar, fetchLugares, deleteLugar, updateLugar, syncLugaresWithFirebase };
