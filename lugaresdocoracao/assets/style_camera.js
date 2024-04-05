import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  icon: {
    width: 30,
    height: 30
  },
  container: {
    flex: 1
  },
  camera: {
    flex: 1
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
    marginLeft: 150,
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
    borderRadius: 25
  },
  closeButton: {
    position: 'absolute',
    bottom: 23, 
    marginLeft: -50,
    backgroundColor: 'transparent',
    padding: 60
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold'
  }
});
