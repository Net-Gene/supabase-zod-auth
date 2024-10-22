/* import { CircleUser, Menu, Package2, Search } from "lucide-react"; */
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";


export function Main() {
    return <>
        <div className="mx-auto grid w-full max-w-6xl gap-2">
            <h1 className="text-4xl font-bold text-center">FullStack 1 Final Lecture</h1>
            <p className="text-lg text-center">
                Viimeisen Full Stack 1 luennon aiheena on perehtyminen autentikaatioon ja autorisointiin lähes tuotantokoodiin rinnastuvassa ympäristössä.
            </p>
        </div>
        <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-1">
            <Card>
                <CardHeader>
                    <CardTitle>Stack</CardTitle>
                    <CardDescription>

                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p>
                        Tilanhallinan kirjastona Valtio https://valtio.dev/
                    </p>
                    <p>
                        Router kirjastona React Router https://reactrouter.com/en/main
                    </p>
                    <p>
                        Backend, tietokanta & tunnistautuminen: Supabase https://supabase.com/
                    </p>

                    <p>
                        Ulkoasun komponenttikirjastona käytössä: https://ui.shadcn.com/
                    </p>

                </CardContent>
                <CardFooter className="border-t px-6 py-4 gap-3">

                    <Button><Link to="https://valtio.dev/">Valtio</Link></Button>
                    <Button><Link to="https://reactrouter.com/en/main">React Router</Link></Button>
                    <Button><Link to="https://supabase.com/">Supabase</Link></Button>
                    <Button><Link to="https://ui.shadcn.com/">Shadcn/ui</Link></Button>



                </CardFooter>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Mitä puuttuu?</CardTitle>
                    <CardDescription>
                        Testit ja datan validointi
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p>
                        Datan validointia varten suositellaan TypeScriptin kanssa käytettäväksi Zod-kirjastoa: https://zod.dev/
                    </p>
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                    <Button><Link to="https://zod.dev/">Zod</Link></Button>

                </CardFooter>
            </Card>
        </div>
    </>

}