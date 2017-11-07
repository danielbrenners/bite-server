using UnityEngine;
using System;
using System.Collections;
using System.Collections.Generic;
using WebSocketSharp;
using WebSocketSharp.Net;
using WebSocketSharp.Server;

public class SocketWrapper : MonoBehaviour
{

	//STARTS WEBSOCKET SERVER USING WEBSOCKET-SHARP

	/* SUBSCRIBE TO CALLBACKS IN SCRIPTS :
	 * 
	 * OnEnable(){
	 * 		GetWSPacket.OnWebsocketMsg += FUNCTIONNAME;
	 * }
	 * 
	*/

	private WebSocketServer wssv;

	void Start()
	{
		wssv = new WebSocketServer (8051);
		wssv.AddWebSocketService<GetWSPacket> ("/webdata");
		wssv.Start();
		print( "WebSocket Server listening on port:" + wssv.Port );
	}

	public void BroadcastData(string str){
		if (wssv.IsListening)
			wssv.WebSocketServices.Broadcast (str);
	}

	void Update()
	{

	}

	void OnApplicationQuit(){
		wssv.Stop();
	}
}

public class GetWSPacket : WebSocketBehavior
{

	public delegate void WebsocketMessage(string str);
	public static event WebsocketMessage OnWebsocketMsg;
	public static event WebsocketMessage OnNewWebsocketConnection;
	public static event WebsocketMessage OnWebsocketClose;

	protected override void OnMessage(MessageEventArgs e)
	{

		string msg = e.Data;
		Debug.Log (msg);

		try{
			OnWebsocketMsg(msg);
		} catch (SystemException err){
			Debug.Log(err.Message);
		}

	}

	protected override void OnOpen()
	{
		Debug.Log ("new connect, currently connected: "+this.Sessions.Count);

		string newhash = Guid.NewGuid ().ToString();
		this.Send (newhash);

		Debug.Log (newhash);

		}

	protected override void OnClose(WebSocketSharp.CloseEventArgs e)
	{
		Debug.Log ("socket dropped, currently open sessions: " +this.Sessions.Count);
		Debug.Log (e.Reason);
		string activeids = "";
		foreach (string id in this.Sessions.ActiveIDs) {
			activeids += id + " ";
		}

	}

}
