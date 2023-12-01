using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ElementaryBasic
{
    class ElementarySourceCode
    {
        public string Name { get; internal set; }
        public string Code { get; internal set; }
        public bool IsModified { get; internal set; }

        public ElementarySourceCode(string name)
        {
            Code = string.Empty;
            Name = name;
        }

        public TResultValue<bool> LoadFromFile(string fileName)
        {
            // todo
            return new TResultValue<bool>(true, ResultCode.Sucess);
        }

        public TResultValue<bool> SaveToFile(string fileName)
        {
            // todo
            return new TResultValue<bool>(true, ResultCode.Sucess);        
        }
    }
}
