import {UserTable} from '@/app/components/UserTable';
import {SearchInput} from '@/app/components/SearchInput';
import {Search} from '@/lib/types';

export default function Home() {
    return (
        <div className="bg-zinc-50 font-sans dark:bg-black">
            <div className={"flex"}>
                <SearchInput kind={Search.Email}/>
                <SearchInput kind={Search.Name}/>

            </div>
           <UserTable/>
        </div>
    );
}
