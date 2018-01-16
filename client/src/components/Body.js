import React from 'react';
import ProjectContainer from './ProjectContainer';

const Body = () => {
    // const lorem = [];
    // for (let i = 0; i < 30; i++) {
    //     lorem.push(
    //         <p key={ i }>
    //         Lorem ipsum dolor sit, amet consectetur adipisicing elit.
    //         Totam quidem dolore placeat accusamus maxime, voluptatibus
    //         earum nisi illum alias! Iste, quae ullam pariatur blanditiis
    //         minus modi sed nulla in odit.
    //       </p>
    //       );
    // }
    return(
        <main className="body">
            <ProjectContainer />
        </main>
    );
}

export default Body;