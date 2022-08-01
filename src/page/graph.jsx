import React, { useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid,Tooltip, CartesianAxis } from 'recharts';



export default function GrapApp() {
  const [credit, setCredit] = React.useState(1000);
  const [credit2, setCredit2] = React.useState(1500);
  const [pagamentoMotorista, setPagamentoMotorista] = React.useState(10398);
  
  const data = [
    {
      name: 'Créditos',
      creditos: credit,
      creditos2: credit2,
    },
    {
      name: 'Pagamento',
      pagamentoMotorista,
      pagamentoComissaoPX: 13980,
      despensaDeReembolsos: 62100,
    },
    {
      name: 'Saldo',
      saldoRestante: 22900,
    },
  ];
  // //TODO - remove this
  // useEffect(() => {
  //   setTimeout(() => {
  //     setCredit(credit + 600);
  //   }, 10000);
  // }, [credit]);

  const allLegendInfos = [
    {id:1, name: 'Créditos por reembolsos de multas e sinistros', color: '#9EE9A2'},
    {id:2, name: 'Estornos', color: '#3D86C6'},
    {id:3, name: 'Créditos inseridos por PIX/TED e boletos', color: '#00AD17'},
    {id:4, name: 'Despesas de reembolsos', color: '#FFCFD5'},
    {id:5, name: 'Pagamento de Comissão PX', color: '#E87779'},
    {id:6, name: 'Pagamento para motoristas', color: '#EA3F3E'},
    {id:7, name: 'Saldo restante', color: '#FF6F15'},
  ]
    const getIntroOfPage = (label,payload) => {
        if (label === 'Créditos') {
            return (
            <>
                <p className="text-black">{`Créditos inseridos por PIX/TED e boletos :  R$ ${payload[0].value}`}</p>
                <p className="text-black">{`Créditos por reembolsos de multas e sinistros :  R$ ${payload[1].value}`}</p>
            </>
          )
        }
        if (label === 'Pagamento') {
            return (
                <>
                    <p className="text-black">{`Pagamento para motoristas :  R$ ${payload[0].value}`}</p>
                    <p className="text-black">{`Pagamento de Comissão PX :  R$ ${payload[1].value}`}</p>
                    <p className="text-black">{`Despesas de reembolsos :  R$ ${payload[2].value}`}</p>
                </>
              )
        }
        if (label === 'Saldo') {
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
        return 'R$'+ new Intl.NumberFormat('pt-BR', {
          notation: "compact",
          compactDisplay: "short"
        }).format(number);
      }

    return (
        <div className='flex flex-col justify-center items-center'>
            <h1 className='font-bold font-mono text-blue-600 text-lg'>Teste</h1>
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
              {/* <CartesianAxis x1={4} /> */}
                <CartesianGrid strokeDasharray="2 2"/>
                {/* <YAxis   tickFormatter={(value)=>'R$'+value}  type='number' > */}
                <YAxis tickCount={30} tickInterval={1000} tickFormatter={DataFormater}  type='number'  />
                
                {/* </YAxis> */}
                <XAxis dataKey="name" />
               
                <Tooltip content={CustomTooltip} />
                
                <Bar dataKey="creditos" stackId="a" fill="#00AD17" />
                <Bar dataKey="creditos2" stackId="a" fill="#9EE9A2" />
                
                <Bar dataKey="pagamentoMotorista" stackId="b" fill="#EA3F3E" />
                <Bar dataKey="pagamentoComissaoPX" stackId="b" fill="#E87779" />
                <Bar dataKey="despensaDeReembolsos" stackId="b" fill="#FFCFD5" />

                <Bar dataKey="saldoRestante" stackId="c" fill="#FF6F15" />
            </BarChart>
            <div className='flex flex-col gap-2'>
              {
                allLegendInfos.map((legendInfo) => (
                  <LegendInfos key={legendInfo.id} name={legendInfo.name} bgColor={legendInfo.color}  />
                  ))
              }
            </div>
        </div>
    );
}
const LegendInfos = (props) => {
  return (
    <div className="flex gap-6">
      <div
        className="flex h-6 w-6"
        style={{ backgroundColor: `${props.bgColor}` }}
      />
      <p className='tw-h-full'>{props.name}</p>
    </div>
  );
};

//verde
// "Créditos inseridos por PIX/TED e boletos" #00AD17
// "Créditos por reembolsos de multas e sinistros" #9EE9A2
//vermelho
// Pagamento para motoristas #EA3F3E
// Pagamento de Comissão PX #E87779
// Despesas de reembolsos  #FFCFD5
// laranja
// Saldo restante #FF6F15