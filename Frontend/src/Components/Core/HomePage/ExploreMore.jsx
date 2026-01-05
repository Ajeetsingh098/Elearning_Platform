import React from 'react'

import { useState } from 'react'
import HighlightText from './HighlightText';

const tabName = [
    "Free",
    "Next to Coding",
    "Most Populer",
    "Skill Paths",
    "Career Paths"
]
function ExploreMore() {
    const [CurrentTab, setCurrentTab] = useState[tabName[0]];
    // const [course, setCourses] = useState(HomePage[0].course)
    // const [currentCard, setCurrentCard] = useState(HomePage[0].course[0].heading)

    // const setMyCards = (value) => {
    //     setCurrentTab(value);
    //     const result = Homepage.filter((course) => course.tag === value);
    //     setCourses(result[0].course);
    //     setCurrentCard(result[0].course[0].heading)
    // }

    return (
        <div>
            <div>
                Unclock the
                <HighlightText text={"Power of Code"}>

                </HighlightText>
            </div>
            <p>
                Learn to build anything that you want to create.
            </p>
            <div className='flex flex-row'>
                {
                    tabName.map((element, index) => {
                        return (
                            <div className={`text-xl flex flex-row items-center
                                ${CurrentTab === element ? "bg-slate-700 font-medium" :"text-slate-500"}
                               
                            `}
                             key={index}
                             onClick={()=>setMyCards(element)}
                            >
                       {element}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default ExploreMore
