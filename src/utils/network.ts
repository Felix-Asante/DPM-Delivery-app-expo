import NetInfo from '@react-native-community/netinfo';

export async function isConnectedToInternet() {
  const connection = await NetInfo.fetch();
  return connection.isConnected && connection.isInternetReachable;
}
