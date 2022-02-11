import { useState, useEffect } from "react";
import BlogList from "./BlogList";

// Ezen a branchen az appnak az az állapota látható, amikor még csak megjelenítjük az adatokat. Mindenhol magyarázatokkal.
// Későbbiekben custom hookká alakítom egy részét, majd CRUD elvek alapján építem

const Home = () => {
    const [blogs, setBlogs] = useState(null);

    const [isLoading, setIsLoading] = useState(true);

    const [error, setError] = useState(null);

    // Blog törlése röviden - Függvényátadással

    // - A handleDelete a Bloglistben minden létrehozott blog-previewnél egy button onclick eventre fut le.
    // - Itt argumentumban adom meg, majd ott propsból olvasom ki.
    // - A fn kap egy id-t, amely mindig az adott blog-previewnél (mert oda kattintott a user) az adott blog.
    // - Ezután deklarálunk egy változót, amelybe filterezzük azokat a blogokat, amelyeknek az id-ja nem egyenlő a kattintás helyének id-jával.
    /* --[ Ez a filter method mindig egy új tömbbel tér vissza. Az eredetit nem módosítja. ]. -- */
    // - A blogs setterFn-vel újraírom a blogs változóm tartalmát, amely így már egyenlő a filterezett blogokkal. Így csak az marad benne amelynek az id-ja nem egyenlő a kattintás helyének id-jával

    // const handleDelete = (id) => {
    //     const newBlogs = blogs.filter((blog) => blog.id !== id);
    //     setBlogs(newBlogs);
    // };

    useEffect(() => {
        fetch("http://localhost:8000/blogs")
            .then((res) => {
                // error-handling a fetchen belül. A response mindig egy object. Ezen belül van egy kulcs - ok. Ezt vizsgáljuk. Ha minden stabil akkor 'ok': true. Azonban ha !res.ok igaz, tehát false akkor Error-t dobunk. Például, ha nem jó az endpoint, nem tudja fetchelni az adott helyről az adatokat, de response jön, csak nem jó.
                if (!res.ok) {
                    throw Error("Could not fetch the data for that resource");
                }
                return res.json();
            })
            .then((data) => {
                setBlogs(data);
                setIsLoading(false);
                setError(null);
            })
            // Error-handling. .catch-elkapjuk az error és az erros stateba frissítjuk/beírjuk az error objektum message kulcsának értékét. Akkor akar itt fenn, ha előtte .then(res) és a .then(data) is failed. Mondjuk nem fut a server, nincs internet stb.
            .catch((err) => {
                setIsLoading(false);
                setError(err.message);
            });
    }, []); // Ha üres tömb a dependency akkor csak egyszer fut le a useEffect, mégpedig az első renderelés után. Amit beírunk ide változót, azt fogja figyelni (watch) és csak annak változásakor fut le a useEffect tartalma.

    return (
        <div className="home">
            {/* Conditional rendering --> Ha a bal oldal true akkor végrehajtja a jobb oldalt */}

            {error && <div>{error}</div>}

            {isLoading && <div>Loading...</div>}

            {blogs && (
                <BlogList
                    blogs={blogs}
                    title="All blogs"
                    // handleDelete={handleDelete}
                />
            )}
        </div>
    );
};

export default Home;
