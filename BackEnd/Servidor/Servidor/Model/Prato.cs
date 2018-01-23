using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Servidor.Model
{
    public class Prato
    {
        //public Prato()
        //{
        //    this.Restaurante = new Restaurante();
        //}

        [Key]
        public int Id { get; set; }

        [DisplayFormat(DataFormatString = "{0:#.##}")]
        public double Valor { get; set; }

        [MaxLength(50)]
        public string Nome { get; set; }

        [ForeignKey("Restaurante")]
        public int RestauranteId { get; set; }

        public virtual Restaurante Restaurante { get; set; }
    }
}
