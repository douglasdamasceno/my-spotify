import React, { useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid,Tooltip } from 'recharts';



export default function GrapApp() {
  const [credit, setCredit] = React.useState(0);
  const [credit2, setCredit2] = React.useState(1500);
  const [pagamentoMotorista, setPagamentoMotorista] = React.useState(10398);
  
  const data = [
    {
      name: 'Page A',
      creditos: credit,
      creditos2: credit2,
    },
    {
      name: 'Page B',
      pagamentoMotorista,
      pagamentoComissaoPX: 1398,
      despensaDeReembolsos: 6210,
    },
    {
      name: 'Page C',
      saldoRestante: 2290,
    },
  ];
  //TODO - remove this
  useEffect(() => {
    setTimeout(() => {
      setCredit(credit + 100);
    }, 10000);
  }, [credit]);

    const getIntroOfPage = (label,payload) => {
        if (label === 'Page A') {
            return (
            <>
                <p className="text-black">{`Créditos inseridos por PIX/TED e boletos :  R$ ${payload[0].value}`}</p>
                <p className="text-black">{`Créditos por reembolsos de multas e sinistros :  R$ ${payload[1].value}`}</p>
            </>
          )
        }
        if (label === 'Page B') {
            return (
                <>
                    <p className="text-black">{`Pagamento para motoristas :  R$ ${payload[0].value}`}</p>
                    <p className="text-black">{`Pagamento de Comissão PX :  R$ ${payload[1].value}`}</p>
                    <p className="text-black">{`Despesas de reembolsos :  R$ ${payload[2].value}`}</p>
                </>
              )
        }
        if (label === 'Page C') {
          return ( 
            <>
                <p className="text-black">{`Saldo restante :  R$ ${payload[0].value}`}</p>
            </>
            )
        }
        return '';
      };
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
          return (
            <div className="bg-white p-4 w-auto h-full rounded-lg border-2 border-black">
              {getIntroOfPage(label,payload)}
            </div>
          );
        }
      
        return null;
      };
      const DataFormater = (number) => {
        //TODO formate com o helper
        // return 'R$'+ number;
        return 'R$'+ new Intl.NumberFormat('pt-BR', {
          notation: "compact",
          compactDisplay: "short"
        }).format(number);
      }
      
    return (
        <div>
            <h1>TEste</h1>
            <BarChart
                width={500}
                height={300}
                data={data}
                margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                {/* <YAxis   tickFormatter={(value)=>'R$'+value}  type='number' > */}
                <YAxis   tickFormatter={DataFormater}  type='number' >
                
                </YAxis>
                <XAxis dataKey="name" />
               
                <Tooltip content={CustomTooltip} />
                
                <Bar dataKey="creditos" stackId="a" fill="#00AD17" />
                <Bar dataKey="creditos2" stackId="a" fill="#9EE9A2" />
                
                <Bar dataKey="pagamentoMotorista" stackId="b" fill="#EA3F3E" />
                <Bar dataKey="pagamentoComissaoPX" stackId="b" fill="#E87779" />
                <Bar dataKey="despensaDeReembolsos" stackId="b" fill="#FFCFD5" />

                <Bar dataKey="saldoRestante" stackId="c" fill="#FF6F15" />
            </BarChart>
        </div>
    );
}
//verde
// "Créditos inseridos por PIX/TED e boletos" #00AD17
// "Créditos por reembolsos de multas e sinistros" #9EE9A2
//vermelho
// Pagamento para motoristas #EA3F3E
// Pagamento de Comissão PX #E87779
// Despesas de reembolsos  #FFCFD5
// laranja
// Saldo restante #FF6F15