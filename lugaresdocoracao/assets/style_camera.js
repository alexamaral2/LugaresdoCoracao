import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  icon: {
    width: 30,
    height: 30
  },
  container: {
    flex: 1,
    justifyContent: 'center', // Centraliza verticalmente
    alignItems: 'center' // Centraliza horizontalmente
  },
  camera: {
    flex: 1,
    width: '100%'
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingBottom: 20,
    paddingHorizontal: 20
  },
  buttonFlip: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: 50,
    height: 50,
    borderRadius: 25
  },
  buttonTake: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: 50,
    height: 50,
    borderRadius: 25,
    left: 200
  },
  contentPhoto: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  img: {
    flex: 1,
    width: '100%',
    resizeMode: 'contain'
  },
  buttonClose: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: 50,
    height: 50,
    borderRadius: 25,
    position: 'absolute',
    top: 20,
    right: 20,
  },
  buttonConfirm: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: 50,
    height: 50,
    borderRadius: 25,
    position: 'absolute',
    top: 20,
    left: 20,
  },
  closeButton: {
    position: 'absolute',
    left: 5,
    backgroundColor: 'transparent',
    padding: 5,
    bottom: '6%' 
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold'
  }
});
