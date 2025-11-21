import {UserTable} from '@/app/components/UserTable';
import {SearchInput} from '@/app/components/SearchInput';
import {Search} from '@/lib/types';
import {CitySelect} from '@/app/components/CitySelect';

export default function Home() {
    return (
        <div className="bg-zinc-50 font-sans dark:bg-black">
            <div className={'flex py-2'}>
                <SearchInput kind={Search.Email}/>
                <SearchInput kind={Search.Name}/>
                <CitySelect/>
            </div>
            <UserTable/>
        </div>
    );
}
