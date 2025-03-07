import { useTransfersUser } from '@/hooks/query/graphql/useTransfersUser';
import React from 'react'

export default function DashboardHistory() {
  const { tuData } = useTransfersUser();

  console.log(tuData);

  return (
    <div>
      {JSON.stringify(tuData)}
    </div>
  )
}
