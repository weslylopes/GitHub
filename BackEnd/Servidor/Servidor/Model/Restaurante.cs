using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Servidor.Model
{
    public class Restaurante
    {
        //public Restaurante()
        //{
        //    this.Prato = new HashSet<Prato>();
        //}

        public int Id { get; set; }

        [MaxLength(50)]
        public string Nome { get; set; }

        //public virtual ICollection<Prato> Prato { get; set; }
    }
}
