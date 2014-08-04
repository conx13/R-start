select to_char(cast(sum(result)/60 as integer),'FM000') ||'h:'|| to_char(cast(sum(result)%60 as integer),'FM00') ||'min.' as aeg_kokku
from result, tootajad
where result.tid=tootajad.tid AND (tid='12') AND (date_part('month',result.start)=date_part('month',now())) AND (date_part('year',result.start)=date_part('year',now()))