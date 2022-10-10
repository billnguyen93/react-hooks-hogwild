import {useState} from "react"
import Hog from "./Hog"
import {v4 as uuidv4} from "uuid"

function HogContainer({hogs}) {
    
    const [greased, setGreased] = useState(false)
    const [sort, setSort] = useState("none")

    function filterAndSortHogs() {
        const filtered = hogs.filter(hog => {
            if(greased) {
                return hog.greased
            } else {
                return true
            }
        })
        if(sort === "none"){
            return filtered
        } else if (sort === "name") {
            return filtered.sort((a,b) => {
                if(a.name > b.name) {
                    return 1
                } else {
                    return -1
                }
            })
        } else {
            return filtered.sort((a,b) => {
                if(a.weight > b.weight) {
                    return 1
                } else {
                    return -1
                }
            })
        }
    }

    
    
    function renderHogs() {
        return filterAndSortHogs().map(hog=> {
            return <Hog key={uuidv4()} hog={hog} />
        })
    }

    function handleClick() {
        setGreased(!greased)
    }

    function handleChange(e) {
        setSort(e.target.value)
    }

    return (
        <div class="ui grid container">
            <div>
                <button onClick={handleClick}>{greased ? "All Hogs" : "Greased Hogs Only"}</button>
                <select onChange={handleChange}>
                    <option>Name</option>
                    <option>Weight</option>
                    <option>None</option>
                </select>
            </div>
            {renderHogs()}
        </div>
    )
}

export default HogContainer