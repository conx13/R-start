SELECT cast(sum(result.result)/60 as integer) ||'h:'|| to_char(cast(sum(result.result)%60 as integer),'FM00') ||'min.' as aeg_kokku
FROM  public.result, public.tootajad
WHERE result.tid = tootajad.tid AND (tootajad.ikood='36106074226') AND (date_part('month',result.start)=date_part('month',now())) AND (date_part('year',result.start)=date_part('year',now()))
