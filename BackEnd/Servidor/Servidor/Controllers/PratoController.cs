using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;
using Servidor.Model;
using Microsoft.EntityFrameworkCore;
//using Newtonsoft.Json;

namespace Servidor.Controllers
{
    [Produces("application/json")]
    [Route("api/Prato")]
    [EnableCors("MyCors")]
    public class PratoController : Controller
    {
        private readonly DBContexto _context;

        public PratoController(DBContexto context)
        {            
            _context = context;
        }

        // GET: api/Prato
        [HttpGet]
        public IEnumerable<Prato> GetPrato()
        {
            var pratos = _context.Prato;
            foreach (var item in pratos)
                item.Restaurante = _context.Restaurante.FirstOrDefault(x => x.Id == item.RestauranteId);
            
            return pratos;
        }

        // GET: api/prato/getName/joão
        [HttpGet("{nome}")]
        [Route("getName/{nome}")] //   /api/prato/getName/1
        public IEnumerable<Prato> GetPratoName([FromRoute] string nome)
        {
            return _context.Prato.Where(m => m.Nome.Contains(nome)).ToList<Prato>();
        }

        // GET: api/Prato/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetPrato([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var prato = await _context.Prato.SingleOrDefaultAsync(m => m.Id == id);

            if (prato == null)
            {
                return NotFound();
            }

            return Ok(prato);
        }

        // PUT: api/Prato/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPrato([FromRoute] int id, [FromBody] Prato prato)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != prato.Id)
            {
                return BadRequest();
            }

            _context.Entry(prato).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PratoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Prato
        [HttpPost]
        public async Task<IActionResult> PostPrato([FromBody] Prato prato)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Prato.Add(prato);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPrato", new { id = prato.Id }, prato);
        }

        // DELETE: api/Prato/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePrato([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var prato = await _context.Prato.SingleOrDefaultAsync(m => m.Id == id);
            if (prato == null)
            {
                return NotFound();
            }

            _context.Prato.Remove(prato);
            await _context.SaveChangesAsync();

            return Ok(prato);
        }

        private bool PratoExists(int id)
        {
            return _context.Prato.Any(e => e.Id == id);
        }


    }
}