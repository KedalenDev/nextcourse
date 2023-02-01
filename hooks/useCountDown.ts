import moment from 'moment';
import React, { useEffect, useState } from 'react'


export type useCountDownProps = {
    targetTime: string,
    isPastDate: boolean,
}
const DATE_FORMAT = "YYYY-MM-DD HH:mm:ss";


//NOW + 5 MIN

//1999
export const useCountDown = ({
    targetTime,
    isPastDate
}: useCountDownProps) => {

    const [targetAsMoment, setTargetAsMoment] = useState(moment(targetTime, DATE_FORMAT))

    const [now, setNow] = useState(moment())
    const [currentDiff, setCurrentDiff] = React.useState(targetTime || '0d 0h 0m 0s')

    React.useEffect(() => {

        if (isPastDate) {
            return
        }

        const interval = setInterval(() => {
            const now = moment()
           

            //get diff in days
            const days = targetAsMoment.diff(now, 'days')
            //get diff in hours
            const hours = targetAsMoment.diff(now, 'hours') - days * 24
            //get diff in minutes
            const minutes = targetAsMoment.diff(now, 'minutes') - days * 24 * 60 - hours * 60
            //get diff in seconds
            const seconds = targetAsMoment.diff(now, 'seconds') - days * 24 * 60 * 60 - hours * 60 * 60 - minutes * 60

            setCurrentDiff(`${days}d ${hours}h ${minutes}m ${seconds}s`)
            
        }, 1000)


        return () => clearInterval(interval)
    },[targetTime])


    return {
        formattedDiff: currentDiff.toString(),
        now: now.format(DATE_FORMAT),
        target: targetAsMoment.format(DATE_FORMAT),
        isInThePast: isPastDate === true || moment().isAfter(targetAsMoment)
    }
}