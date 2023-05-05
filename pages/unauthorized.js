import Layout from '@/components/Layout';
import { useRouter } from 'next/router';
import React from 'react'

export default function Unauthorized() {

    const router = useRouter();
    const {message} = router.query;


  return (
    <Layout title="Unauthorized">
        <h1 className="text-2xl">Unauthorized</h1>
        {message && <div className="text-red-800">{message}</div>}
    </Layout>
  )
}
