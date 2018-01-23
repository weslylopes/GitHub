using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Servidor.Model
{
    public class DBContexto: DbContext
    {
        public DBContexto(DbContextOptions<DBContexto> options) : base(options) {
            
        }

        public DbSet<Restaurante> Restaurante { get; set; }
        public DbSet<Prato> Prato { get; set; }
    }
}
