import { icons } from 'lucide-react-native'
import React from 'react'

const NameToIcon = ({name, size, color}: {name: string, size: number, color: string}) => {
    const LucideIcon: any = icons[name as never];
    return <LucideIcon color={color} size={size}/>
}

export default NameToIcon