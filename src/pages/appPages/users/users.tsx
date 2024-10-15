import { useQuery } from "@tanstack/react-query";
import { View, Text, Image, ActivityIndicator } from "react-native";
import { ListingOfAllUsers } from "./services/listingOfAllUsers";
import { Button } from "../../../components/button/Button";


export function Users() {


    const { data } = useQuery({
        queryKey: ['Users'],
        queryFn: ListingOfAllUsers,
    });

    interface UserProps {
        id: string
        name: string
        secondName: string
        email: string
        role: boolean
        avatar: string
    }



    return (
        <>
            <View className='dark:bg-[#121214] w-full h-screen'>
                <View className="px-5 pt-5">
                    <View className='flex flex-row justify-center mb-5'>
                        <Text className='dark:text-white font-medium'>Usuários Cadastrados</Text>
                    </View>
                    <View className="mt-5">
                        {data ?
                            data?.map((user: UserProps) => (
                                <View className="flex flex-row items-center" key={user.id}>
                                    <View className="mr-3">
                                        <Image source={{ uri: user?.avatar }} width={40} height={40} className="rounded-full" />
                                    </View>
                                    <View className="my-2">
                                        <Text className="font-semibold text-sm dark:text-text">{user?.name} {user?.secondName}</Text>
                                        <Text className="text-xs font-medium text-zinc-600" >{user?.role}</Text>
                                    </View>
                                </View>
                            ))
                            :
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} className="mt-10">
                                <ActivityIndicator size="large" />
                            </View>
                        }
                    </View>
                </View>
            </View>

        </>
    )
}