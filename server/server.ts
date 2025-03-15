import { supabase } from "@/utils/supabase"

export async function getDoctorList (){
    let { data: user, error } = await supabase
.from('user')
.select('*')
.eq('role' , 'doctor')
        return user;
}