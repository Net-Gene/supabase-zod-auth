import { createClient } from '@supabase/supabase-js'
import { Database } from "./supabase"

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLIC_KEY

export const supabase = createClient<Database>(supabaseUrl, supabaseKey)


// Pelissä käytetty supabase-taulu pisteiden asettamiselle
export async function addPointsToDb(nickname: string, points: number) {

    if (!nickname) {
        alert("käyttäjänimi tarvitaan")
        return
    }

    const { data, error } = await supabase.from('ranking').insert([
        {
            nickname: nickname,
            points: points
        }
    ]).select()

    if (error) {
        alert("Tapahtui virhe: " + error.message)
        return
    }

    console.log(data)
    return data.at(0)

}

export async function getRankingList() {
    
    const {data, error} = await supabase.from('ranking').select('*')

    if(error){
        console.log(error)
    }

    return data

}