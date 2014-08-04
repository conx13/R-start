select to_char(cast(sum(result)/60 as integer),'FM00') ||':'|| to_char(cast(sum(result)%60 as integer),'FM00')
from result
where result.start>=now()::date AND (tid='91')