import React, { useEffect } from 'react'
import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import { useSelector } from 'react-redux'
import Header from '@app/components/ui/Header'
import { Crown, User } from 'lucide-react-native'
import { RootState } from '@app/redux/store'
import { getLeaderboardDetails } from '@app/redux/slices/dashboardSlice'
import { useDispatch } from 'react-redux'
import { leaderboardWinnerType } from '@app/types/dashboard'

function isCurrentUser(current_user_code: string, leaderboard_user_code: string) {
  return current_user_code == leaderboard_user_code
}

const Leaderboard = () => {
  const { leaderboard_details: { jackpot_winner, mega_winner, mini_winner }, IsLoading } = useSelector((state: RootState) => state.dashboard_slice);
  const user = useSelector((states: RootState) => states.user.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const getLeaderboardData = () => {
      const series_number = user?.series_number;
        dispatch(getLeaderboardDetails(series_number));
    };
    getLeaderboardData();
  }, [user?.series_number]);

  return (
    <View className='flex-1 bg-white dark:bg-app-dark-theme-0'>
      <Header title='Leaderboard' backButtonShown={true}/>
      {
        mini_winner && mega_winner && jackpot_winner ? (
          <>
            <View className='w-full h-auto py-3 my-2.5 relative flex-row items-center justify-evenly '>
              {/* mega winner 1 */}
              <View className='mt-6'>
                <View className='relative flex items-center'>
                  <View className={`w-24 h-24 rounded-full overflow-hidden flex items-center relative border-2 ${isCurrentUser(user?.user_code, mega_winner[0].user_code) ? 'border-app-green' : 'border-gray-200'}`}>
                    <User size={110} color={"#222"} fill={"#222"} />
                  </View>
                  <View className='bg-gray-700 absolute -bottom-2 w-6 h-6 flex items-center justify-center rounded-full'><Text className='text-white'>2</Text></View>
                </View>
                <View className='flex-col items-center mt-2 w-28'>
                  <Text numberOfLines={1} ellipsizeMode='tail' className='text-black font-poppins-medium font-semibold'>{isCurrentUser(user?.user_code, mega_winner[0].user_code) ? "You" : mega_winner[0].full_name}</Text>
                  <Text numberOfLines={1} ellipsizeMode='tail' className='text-black text-[10px] uppercase font-poppins-medium'>{mega_winner[0].user_code}</Text>
                  <Text className='text-black font-poppins-medium font-semibold'>{mega_winner[0].amount}</Text>
                </View>
              </View>
              {/* jackpot winner */}
              <View className='-mt-10'>
                <View className='relative flex items-center'>
                  <View className='absolute -top-4 z-10'><Crown size={30} fill={"#8EE04E"} /></View>
                  <View className={`w-24 h-24 rounded-full overflow-hidden flex items-center relative border-2 ${isCurrentUser(user?.user_code, jackpot_winner.user_code) ? 'border-app-green' : 'border-gray-200'}`}>
                    <User size={110} color={"#222"} fill={"#222"} />
                  </View>
                  <View className='bg-gray-700 absolute -bottom-2 w-6 h-6 flex items-center justify-center rounded-full'><Text className='text-white'>1</Text></View>
                </View>
                <View className='flex-col items-center mt-2 w-28'>
                  <Text numberOfLines={1} ellipsizeMode='tail' className='text-black font-poppins-medium font-semibold'>{isCurrentUser(user?.user_code, jackpot_winner.user_code) ? "You" : jackpot_winner.full_name}</Text>
                  <Text numberOfLines={1} ellipsizeMode='tail' className='text-black text-[10px] uppercase font-poppins-medium'>{jackpot_winner.user_code}</Text>
                  <Text className='text-black font-poppins-medium font-semibold'>{jackpot_winner.amount}</Text>
                </View>
              </View>
              {/* mega winner 2 */}
              <View className='mt-6'>
                <View className='relative flex items-center'>
                  <View className={`w-24 h-24 rounded-full overflow-hidden flex items-center relative border-2 ${isCurrentUser(user?.user_code, mega_winner[1].user_code) ? 'border-app-green' : 'border-gray-200'}`}>
                    <User size={110} color={"#222"} fill={"#222"} />
                  </View>
                  <View className='bg-gray-700 absolute -bottom-2 w-6 h-6 flex items-center justify-center rounded-full'><Text className='text-white'>3</Text></View>
                </View>
                <View className='flex-col items-center mt-2  w-28'>
                  <Text numberOfLines={1} ellipsizeMode='tail' className='text-black font-poppins-medium font-semibold'>{isCurrentUser(user?.user_code, mega_winner[1].user_code) ? "You" : mega_winner[1].full_name}</Text>
                  <Text numberOfLines={1} ellipsizeMode='tail' className='text-black text-[10px] uppercase font-poppins-medium'>{mega_winner[1].user_code}</Text>
                  <Text className='text-black font-poppins-medium font-semibold'>{mega_winner[1].amount}</Text>
                </View>
              </View>
            </View>
            <View className='flex-1 rounded-t-[50px] bg-app-green px-4 pt-8 overflow-hidden'>
              <FlatList
                data={mini_winner}
                renderItem={({ item, index }: { item: leaderboardWinnerType, index: number }) => {
                  return (
                    <View className={`w-full border flex-row items-center justify-between px-2.5 border-[#f2f2f34b] h-12 my-1 rounded-2xl ${isCurrentUser(user?.user_code, item.user_code) ? 'bg-app-green-outline' : 'bg-[#64c47f3d]'}`}>
                      <View className="flex-row items-center gap-x-4">
                        <View>
                          <Text className='text-[16px]'>{index + 4}</Text>
                        </View>
                        <View>
                          <Text className='text-sm capitalize font-poppins-semibold font-semibold'>{isCurrentUser(user?.user_code, item.user_code) ? "You" : item.full_name}</Text>
                          <Text className='text-[10px] uppercase'>{item.user_code}</Text>
                        </View>
                      </View>
                      <View>
                        <Text className='text-sm font-poppins-semibold font-semibold'>{item.amount}</Text>
                      </View>
                    </View>
                  )
                }}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
              />
            </View>
          </>
        ) : (
          <View className="flex-1 w-full p-4 bg-white dark:bg-app-dark-theme-0">
            <View className="flex-1 border items-center justify-center border-gray-200 dark:border-[#222] rounded-md">
              { IsLoading ? (
                  <ActivityIndicator size="large" color="#999" />
                ) : (
                  <Text className="text-2xl text-center text-[#222] dark:text-white font-poppins-medium">No Winner This Month</Text>
                )
              }
            </View>
          </View>
        )
      }
    </View>
  )
}

export default Leaderboard