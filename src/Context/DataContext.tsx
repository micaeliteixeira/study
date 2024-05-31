import React, { createContext, PropsWithChildren, useContext } from 'react'
import useFetch from '../Hook/useFeatch'

interface IDataContext {
  loading: boolean
  error: string | null
  data: IVenda[] | null
}

interface IVenda {
  id: string
  nome: string
  preco: number
  status: 'pago' | 'processando' | 'falha'
  pagamento: 'boleto' | 'cartao' | 'pix'
  data: string
  parcelas: number | null
}

const DataContext = createContext<IDataContext | null>(null)

export const useData = () => {
  const context = useContext(DataContext)
  if (!context) throw new Error('useData precisa estar em DataContextProvider')
  return context
}

export const DataContextProvider = ({ children }: PropsWithChildren<{}>) => {
  const { data, loading, error } = useFetch<IVenda[]>('https:// data.origamid.dev/vendas/')

  return <DataContext.Provider value={{ data, loading, error }}>{children}</DataContext.Provider>
}
