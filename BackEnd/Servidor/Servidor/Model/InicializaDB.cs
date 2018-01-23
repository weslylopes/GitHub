using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Servidor.Model
{
    public class InicializaDB
    {
        public static void Initialize(DBContexto contexto)
        {
            contexto.Database.EnsureCreated();

            //verifica se existe registros
            if (contexto.Restaurante.Any())
                return;//caso possua para por aqui.

            //var restaurantes = new Restaurante[]
            //{
            //    new Restaurante{
            //        Nome ="Dom de Minas",
            //        Prato = new Prato[]
            //        {
            //            new Prato{Nome="Executivo", Valor=20.00},
            //            new Prato{Nome="Simples", Valor=15.00},
            //            new Prato{Nome="Espanca Leão", Valor=17.00}
            //        }
            //    },
            //    new Restaurante{
            //        Nome ="Bom Sabor",
            //        Prato = new Prato[]
            //        {
            //            new Prato{Nome="Executivo", Valor=15.00},
            //            new Prato{Nome="Simples", Valor=10.00},
            //            new Prato{Nome="Espanca Leão", Valor=12.00}
            //        }
            //    }
            //};

            //contexto.Restaurante.AddRange(restaurantes);
            contexto.SaveChanges();
        }
    }
}
