
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Input } from "@/components/ui/input"
import { TableCaption, TableHeader, TableRow, TableHead, TableBody, TableCell, TableFooter } from "@/components/ui/table"
import {  supabase } from "@/services/supabase_client"
import { Table } from "@/components/ui/table"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import { proxy, useSnapshot } from "valtio"

const ranking = proxy<{
  rankingList: { created_at: string; id: number; nickname: string; points: number; }[] | null,
  fetchList: () => Promise<void>
}>({
  rankingList: [],
  async fetchList() {
    const {data, error} = await supabase.from('ranking').select('*')

    if(error) {
      return
    }

    this.rankingList = data 
  }
})


// Esimerkki pohjakomponentista, tässä tapauksessa toimii toistaiseksi ns. täytesivuna
export function Dashboard() {

  const snap = useSnapshot(ranking)

  useEffect(() => {
    ranking.fetchList()
  }, [])



  return (
    <><div className="mx-auto grid w-full max-w-6xl gap-2">
      <h1 className="text-3xl font-semibold">Asetukset</h1>
    </div>
      <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
        <nav
          className="grid gap-4 text-sm text-muted-foreground" x-chunk="dashboard-04-chunk-0"
        >
          <Link to="#" className="font-semibold text-primary">
            General
          </Link>
          <Link to="#">Security</Link>
          <Link to="#">Integrations</Link>
          <Link to="#">Support</Link>
          <Link to="#">Organizations</Link>
          <Link to="#">Advanced</Link>
        </nav>
        <div className="grid gap-6">
          <Card x-chunk="dashboard-04-chunk-1">
            <CardHeader>
              <CardTitle>Store Name</CardTitle>
              <CardDescription>
                Used to identify your store in the marketplace.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <Input placeholder="Store Name" />
              </form>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button>Save</Button>
            </CardFooter>
          </Card>
          <Card x-chunk="dashboard-04-chunk-2">
            <CardHeader>
              <CardTitle>Ranking lista esimerkkinä tässä</CardTitle>
            </CardHeader>
            <CardContent>
        

              <Table>
                <TableCaption>Ranking taulu</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Nimimerkki</TableHead>
                    <TableHead>Pelattu</TableHead>
                    <TableHead>Pisteet</TableHead>
                    <TableHead className="text-right">ID</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {snap.rankingList?.map((item,i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">{item.nickname}</TableCell>
                      <TableCell>{item.created_at}</TableCell>
                      <TableCell>{item.points}</TableCell>
                      <TableCell className="text-right">{item.id}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                 
                </TableFooter>
              </Table>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button>Save</Button>
            </CardFooter>
          </Card>
        </div>
      </div></>
  )
}
