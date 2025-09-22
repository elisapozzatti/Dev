import Cards from './Cards';
function Main(){
    return (
        <main>
            <section class="containerbreed">
                <h1 class="main">Razze popolari</h1>
                <section class="containercard">
                    <Cards img="/golden.jpg" breed="Golden Retriever" description="Friendly and intelligent family dogs known for their golden cost."/>
                    <Cards img="/pastore.jpg" breed="German Sheperd" description="Loyal and protective working dogs with strong intelligence."/>
                    <Cards img="/cane3.jpg" breed="Schnauzer" description="Outgoing and high-spirited companions, great with families."/>
                </section>
            </section>
            <section class="recensionicontainer">
                <h1 class="recensioni"><b>Recensioni</b></h1>
                <section class="containerdiv">
                    <div class="divrecensioni">
                        <div class="orizontal">
                            <img class="profilo" src="./cane3.jpg" />
                            <div class="vertical">
                                <h3 class="name"><b>Sarah Johnson</b></h3>
                                <div>
                                    <img class="stelle" src="./stella.png"/>
                                    <img class="stelle" src="./stella.png"/>
                                    <img class="stelle" src="./stella.png"/>
                                    <img class="stelle" src="./stella.png"/>
                                    <img class="stelle" src="./stella.png"/>
                                </div>
                            </div>
                        </div>
                        <p>My Golden Retriever changed my life! Best decision ever.</p>
                    </div>
                    <div class="divrecensioni">
                        <div class="orizontal">
                            <img class="profilo" src="./golden.jpg" />
                            <div class="vertical">
                            <h3 class="name"><b>Mike Peterson</b></h3>
                            <div>
                                <img class="stelle" src="./stella.png"/>
                                <img class="stelle" src="./stella.png"/>
                                <img class="stelle" src="./stella.png"/>
                                <img class="stelle" src="./stella.png"/>
                            </div>
                            </div>
                        </div>
                        <p>Great companion for my daily runs. Couldn't be happier!</p>
                    </div>
                    <div class="divrecensioni">
                        <div class="orizontal">
                            <img class="profilo" src="./pastore.jpg" />
                            <div class="vertical">
                                <h3 class="name"><b>Emily Chen</b></h3>
                                <div>
                                    <img class="stelle" src="./stella.png"/>
                                    <img class="stelle" src="./stella.png"/>
                                    <img class="stelle" src="./stella.png"/>
                                    <img class="stelle" src="./stella.png"/>
                                    <img class="stelle" src="./stella.png"/>
                                </div>
                            </div>
                        </div>
                        <p>Such a loving addition to our family. The kids adore him!</p>
                    </div>
                </section>
            </section>
        </main>
    );
}
export default Main;