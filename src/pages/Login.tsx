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
import { Label } from "@/components/ui/label"
import { authStore } from "@/stores/auth"
import { Form } from "react-router-dom"
import { proxy } from "valtio"


export function Login() {

    // TODO: Tarkista onko tämä turvallinen ratkaisu? Voiko komponentin tila jäädä "elämään"?
    // Parempi tapa olisi ehkä käyttää esim. react-routerin Form komponenttia: https://reactrouter.com/en/main/components/form
    // https://valtio.dev/docs/api/basic/proxy
    // Validointi tulisi tehdä ennen submittia esim. https://zod.dev/ kirjastoa hyödyntämällä
    const credentials = proxy({ email: '', password: '' })

    return <div className="flex w-full flex-col justify-center items-center">


        <Card className=" max-w-sm">

            <CardHeader>
                <CardTitle className="text-2xl">Kirjaudu sisään</CardTitle>
                <CardDescription>
                    Syötä sähköpostiosoite ja salasana kirjautuaksesi sisään
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
            <Form>
                <div className="grid gap-2">
                    <Label htmlFor="email">Sähköposti</Label>
                    <Input onChange={(e)=> credentials.email = e.target.value }  autoComplete="username" id="email" type="email" placeholder="m@example.com" required />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="password">Salasana</Label>
                    <Input onChange={(e)=> credentials.password = e.target.value} autoComplete="current-password" id="password" type="password" required />
                </div>
            </Form>
            </CardContent>
            <CardFooter>
                <Button className="w-full" onClick={()=> authStore.login({...credentials})}>Kirjaudu sisään</Button>
            </CardFooter>
        </Card>


    </div>
}